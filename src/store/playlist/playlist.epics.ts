import { Epic, ofType } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { createTuple } from '../../functions';
import {
    ListOfCurrentUsersPlaylistsResponse, PlaylistTrackResponse
} from '../../typings/spotify-api';
import { RootState } from '../root-state';
import { getBearerToken } from '../user';
import {
    loadPlaylists, loadPlaylistsAdditionalPages, loadPlaylistsAdditionalPagesError,
    loadPlaylistsAdditionalPagesSuccess, loadPlaylistsError, loadPlaylistsSuccess,
    loadPlaylistTracks, loadPlaylistTracksBecausePlaylistsLoaded,
    loadPlaylistTracksBecausePlaylistsLoadedSuccess, loadPlaylistTracksError,
    loadPlaylistTracksSuccess, PlaylistAction
} from './playlist.actions';
import { mapToPlaylist, mapToTrack } from './playlist.mappers';

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
          const additionalLoadPlaylistActions = new Array(
            Math.floor(response.total / response.limit)
          )
            .fill(null)
            .map((_, index) => loadPlaylistsAdditionalPages({ offset: index * 50 + 50 }));

          return [
            loadPlaylistsSuccess({ playLists: response.items.map(mapToPlaylist) }),
            ...additionalLoadPlaylistActions,
          ];
        }),
        catchError((error) => of(loadPlaylistsError({ error })))
      )
    )
  );

export const loadPlaylistAdditionalPagesEpic: Epic<PlaylistAction, PlaylistAction, RootState> = (
  action$,
  store$
) =>
  action$.pipe(
    ofType(loadPlaylistsAdditionalPages.type),
    withLatestFrom(store$.pipe(map(getBearerToken))),
    mergeMap(([action, bearerToken]) =>
      getListOfCurrentUsersPlaylists(bearerToken, action.payload.offset).pipe(
        map((response) =>
          loadPlaylistsAdditionalPagesSuccess({ playLists: response.items.map(mapToPlaylist) })
        ),
        catchError((error) => of(loadPlaylistsAdditionalPagesError({ error })))
      )
    )
  );

export const loadPlaylistSuccessEpic: Epic<PlaylistAction> = (actions$) =>
  actions$.pipe(
    ofType(loadPlaylistsSuccess.type, loadPlaylistsAdditionalPagesSuccess.type),
    map((action) => {
      const playlistIds = action.payload.playLists.map((p) => p.id);

      return loadPlaylistTracksBecausePlaylistsLoaded({ playlistIds });
    })
  );

export const loadPlaylistTracksBecausePlaylistsLoadedEpic: Epic<
  PlaylistAction,
  PlaylistAction,
  RootState
> = (actions$, store$) =>
  actions$.pipe(
    ofType(loadPlaylistTracksBecausePlaylistsLoaded.type),
    withLatestFrom(store$.pipe(map(getBearerToken))),
    mergeMap(([action, bearerToken]) => {
      const loadTracksObservables = action.payload.playlistIds.map((playlistId) =>
        getPlaylistTracks(playlistId, bearerToken).pipe(
          map((tracksResponse) => createTuple(playlistId, tracksResponse))
        )
      );

      return forkJoin(loadTracksObservables);
    }),
    withLatestFrom(store$.pipe(map(getBearerToken))),
    /* We got the initial responses for all playlists, fetch additional
     * pages of tracks for playlists where necessary now */
    mergeMap(([responses, bearerToken]) =>
      forkJoin(
        responses.map(([playlistId, tracksResponse]) => {
          const loadAdditionalTracksObservables = new Array(
            Math.floor(tracksResponse.total / tracksResponse.limit)
          )
            .fill(null)
            .map((_, index) => getPlaylistTracks(playlistId, bearerToken, index * 100 + 100));
          loadAdditionalTracksObservables.unshift(of(tracksResponse));

          return forkJoin(loadAdditionalTracksObservables).pipe(
            map((responses) => responses.flatMap((r) => r.items).map((item) => mapToTrack(item))),
            map((tracks) => createTuple(playlistId, tracks))
          );
        })
      )
    ),
    map((tracksByPlaylistId) =>
      loadPlaylistTracksBecausePlaylistsLoadedSuccess({ tracksByPlaylistId })
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
          const loadAdditionalTracksObservables = new Array(
            Math.floor(response.total / response.limit)
          )
            .fill(null)
            .map((_, index) =>
              getPlaylistTracks(action.payload.playlistId, bearerToken, index * 100 + 100)
            );
          loadAdditionalTracksObservables.unshift(of(response));

          return forkJoin(loadAdditionalTracksObservables);
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
    'limit': '50'
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
    'limit': '100',
    'fields': 'total,limit,items(track(id,name,album,artists))'
  });

  if(offset !== null) {
    queryParams.append('offset', offset.toString());
  }

  return ajax.getJSON<PlaylistTrackResponse>(url + queryParams.toString(), {
    authorization: bearerToken
  });
}
