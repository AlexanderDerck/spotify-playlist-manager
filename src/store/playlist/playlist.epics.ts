import { Epic, ofType } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    ListOfCurrentUsersPlaylistsResponse, PlaylistTrackResponse
} from '../../typings/spotify-api';
import { RootState } from '../root-state';
import { getBearerToken } from '../user';
import {
    changeSelectedPlaylistIds, loadPlaylists, loadPlaylistsError, loadPlaylistsSuccess,
    loadPlaylistTracks, loadPlaylistTracksBecauseSelectedPlaylistsChanged, loadPlaylistTracksError,
    loadPlaylistTracksSuccess, PlaylistAction
} from './playlist.actions';
import { mapToPlaylist, mapToTrack } from './playlist.mappers';
import { getSelectedPlaylistIds } from './playlist.selectors';

const GET_PLAYLIST_LIMIT = 50;
const GET_TRACKS_LIMIT = 100;

export const loadPlaylistEpic: Epic<PlaylistAction, PlaylistAction, RootState> = (
  actions$,
  store$
) =>
  actions$.pipe(
    ofType(loadPlaylists.type),
    withLatestFrom(store$.pipe(map(getBearerToken))),
    switchMap(([_, bearerToken]) =>
      getListOfCurrentUsersPlaylists(bearerToken).pipe(
        switchMap((response) => {
          const loadPlaylistsObservables = new Array(Math.floor(response.total / response.limit))
            .fill(null)
            .map((_, index) =>
              getListOfCurrentUsersPlaylists(
                bearerToken,
                index * GET_PLAYLIST_LIMIT + GET_PLAYLIST_LIMIT
              )
            );
          loadPlaylistsObservables.unshift(of(response));

          return forkJoin(loadPlaylistsObservables);
        }),
        map((responses) =>
          loadPlaylistsSuccess({ playLists: responses.flatMap((r) => r.items).map(mapToPlaylist) })
        ),
        catchError((error) => of(loadPlaylistsError({ error })))
      )
    )
  );

export const changeSelectedPlaylistIdsEpic: Epic<PlaylistAction> = (actions$) =>
  actions$.pipe(
    ofType(changeSelectedPlaylistIds.type),
    map((_) => loadPlaylistTracksBecauseSelectedPlaylistsChanged())
  );

export const loadPlaylistTracksBecauseSelectedPlaylistsChangedEpic: Epic<
  PlaylistAction,
  PlaylistAction,
  RootState
> = (actions$, store$) =>
  actions$.pipe(
    ofType(loadPlaylistTracksBecauseSelectedPlaylistsChanged.type),
    withLatestFrom(store$.pipe(map(getSelectedPlaylistIds))),
    mergeMap(([_, playlistIds]) =>
      playlistIds.map((playlistId) => loadPlaylistTracks({ playlistId }))
    )
  );

export const loadPlaylistTracksEpic: Epic<PlaylistAction, PlaylistAction, RootState> = (
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
function getListOfCurrentUsersPlaylists( bearerToken: string, offset: number = null): Observable<ListOfCurrentUsersPlaylistsResponse> {
  const url = 'https://api.spotify.com/v1/me/playlists?';
  const queryParams = new URLSearchParams({
    'limit': GET_PLAYLIST_LIMIT.toString()
  });

  if (offset !== null) {
    queryParams.append('offset', offset.toString());
  }

  return ajax.getJSON<ListOfCurrentUsersPlaylistsResponse>(url + queryParams.toString(), {
    authorization: bearerToken,
  });
}

// prettier-ignore
function getPlaylistTracks(playlistId: string, bearerToken: string, offset: number = null): Observable<PlaylistTrackResponse> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?`;
  const queryParams = new URLSearchParams({
    'limit': GET_TRACKS_LIMIT.toString(),
    'fields': 'total,limit,items(track(id,name,album,artists))'
  });

  if(offset !== null) {
    queryParams.append('offset', offset.toString());
  }

  return ajax.getJSON<PlaylistTrackResponse>(url + queryParams.toString(), {
    authorization: bearerToken
  });
}
