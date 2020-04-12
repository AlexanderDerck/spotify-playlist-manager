import { Epic, ofType } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../environment';
import { ListOfCurrentUsersPlaylistsResponse } from '../../typings/spotify-api';
import {
    loadAllTracksForAllPlaylists, loadPlaylists, loadPlaylistsError, loadPlaylistsSuccess,
    PlaylistAction
} from '../actions';
import { mapToPlaylist } from '../mappers/playlist.mappers';
import { RootState } from '../root-state';
import { getBearerToken } from '../selectors';

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
                index * environment.GetPlaylistsPagingLimit + environment.GetPlaylistsPagingLimit
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

export const loadPlaylistsSuccessEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(loadPlaylistsSuccess.type),
    map((_) => loadAllTracksForAllPlaylists())
  );

// prettier-ignore
function getListOfCurrentUsersPlaylists( bearerToken: string, offset: number = null): Observable<ListOfCurrentUsersPlaylistsResponse> {
  const url = 'https://api.spotify.com/v1/me/playlists?';
  const queryParams = new URLSearchParams({
    'limit': environment.GetPlaylistsPagingLimit.toString()
  });

  if (offset !== null) {
    queryParams.append('offset', offset.toString());
  }

  return ajax.getJSON<ListOfCurrentUsersPlaylistsResponse>(url + queryParams.toString(), {
    authorization: bearerToken,
  });
}
