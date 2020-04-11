import { Epic, ofType } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PlaylistTrackResponse } from '../../typings/spotify-api';
import {
    loadPlaylistTracks, loadPlaylistTracksBecauseSelectedPlaylistsChanged, loadPlaylistTracksError,
    loadPlaylistTracksSuccess, TrackAction
} from '../actions';
import { mapToTrack } from '../mappers/track.mappers';
import { RootState } from '../root-state';
import { getBearerToken, getSelectedPlaylistIdsWithoutTracksLoaded } from '../selectors';

const GET_TRACKS_LIMIT = 100;

export const loadPlaylistTracksBecauseSelectedPlaylistsChangedEpic: Epic<
  TrackAction,
  TrackAction,
  RootState
> = (actions$, store$) =>
  actions$.pipe(
    ofType(loadPlaylistTracksBecauseSelectedPlaylistsChanged.type),
    withLatestFrom(store$.pipe(map(getSelectedPlaylistIdsWithoutTracksLoaded))),
    mergeMap(([_, playlistIds]) =>
      playlistIds.map((playlistId) => loadPlaylistTracks({ playlistId }))
    )
  );

export const loadPlaylistTracksEpic: Epic<TrackAction, TrackAction, RootState> = (
  action$,
  store$
) =>
  action$.pipe(
    ofType(loadPlaylistTracks.type),
    withLatestFrom(store$.pipe(map(getBearerToken))),
    mergeMap(([action, bearerToken]) =>
      getPlaylistTracks(action.payload.playlistId, bearerToken).pipe(
        mergeMap((response) => {
          const loadTracksObservables = new Array(Math.floor(response.total / response.limit))
            .fill(null)
            .map((_, index) =>
              getPlaylistTracks(
                action.payload.playlistId,
                bearerToken,
                index * GET_TRACKS_LIMIT + GET_TRACKS_LIMIT
              )
            );
          loadTracksObservables.unshift(of(response));

          return forkJoin(loadTracksObservables);
        }),
        map((responses) => {
          const flattenedTracks = responses.flatMap((response) => response.items);

          return loadPlaylistTracksSuccess({
            playlistId: action.payload.playlistId,
            tracks: flattenedTracks.map(mapToTrack),
          });
        }),
        catchError((error) => of(loadPlaylistTracksError({ error })))
      )
    )
  );

// prettier-ignore
function getPlaylistTracks(playlistId: string, bearerToken: string, offset: number = null): Observable<PlaylistTrackResponse> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?`;
  const queryParams = new URLSearchParams({
    'limit': GET_TRACKS_LIMIT.toString(),
    // 'fields': 'total,limit,items(track(id,name,album,artists))'
  });

  if(offset !== null) {
    queryParams.append('offset', offset.toString());
  }

  return ajax.getJSON<PlaylistTrackResponse>(url + queryParams.toString(), {
    authorization: bearerToken
  });
}
