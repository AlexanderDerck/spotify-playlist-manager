import { Epic, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ListOfCurrentUsersPlaylistsResponse } from '../../typings/spotify-api';
import { RootState } from '../root-state';
import { getBearerToken } from '../user';
import {
    loadPlaylists, loadPlaylistsAdditionalPages, loadPlaylistsAdditionalPagesError,
    loadPlaylistsAdditionalPagesSuccess, loadPlaylistsError, loadPlaylistsSuccess, PlaylistAction
} from './playlist.actions';
import { mapToPlaylist } from './playlist.mappers';

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
    mergeMap(([action, bearerToken]: [any, string]) =>
      getListOfCurrentUsersPlaylists(bearerToken, action.payload.offset).pipe(
        map((response) =>
          loadPlaylistsAdditionalPagesSuccess({ playLists: response.items.map(mapToPlaylist) })
        ),
        catchError((error) => of(loadPlaylistsAdditionalPagesError({ error })))
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
