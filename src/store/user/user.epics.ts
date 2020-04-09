import { CurrentUsersProfileResponse } from '../../typings';
import { Epic, ofType } from 'redux-observable';
import { NEVER, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../models';
import { withAccessToken } from '../../utils';
import { RootState } from '../root-state';
import {
  authorize,
  checkAuthorization,
  checkAuthorizationAuthorized,
  checkAuthorizationNotAuthorized,
  loadUserBecauseAuthorized,
  loadUserBecauseAuthorizedError,
  UserAction,
  loadUserBecauseAuthorizedSuccess,
} from './user.actions';

export const checkAuthorizationEpic: Epic<UserAction, UserAction> = (action$) =>
  action$.pipe(
    ofType(checkAuthorization.type),
    map((_) => {
      const url = new URL(window.location.toString());
      const hashParams = new URLSearchParams(url.hash.substr(1));
      const accessToken = hashParams.get('access_token');

      return accessToken != null
        ? checkAuthorizationAuthorized({ accessToken })
        : checkAuthorizationNotAuthorized();
    })
  );

export const loadUserBecauseUserLoggedInEpic: Epic<UserAction, UserAction> = (action$) =>
  action$.pipe(
    ofType(checkAuthorizationAuthorized.type),
    map((_) => loadUserBecauseAuthorized())
  );

export const authorizeEpic: Epic<UserAction, any> = (action$) =>
  action$.pipe(
    ofType(authorize.type),
    map((_) => {
      const queryParams = new URLSearchParams({
        client_id: '17df0cd526354633a5ab47045e8efa8c',
        response_type: 'token',
        redirect_uri: 'https://10.63.1.202:3000',
        scope:
          'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private',
      });

      window.location.replace('https://accounts.spotify.com/authorize?' + queryParams.toString());

      return NEVER;
    })
  );

export const loadUserEpic: Epic<UserAction, UserAction, RootState> = (actions$, store$) =>
  actions$.pipe(
    ofType(loadUserBecauseAuthorized.type),
    withAccessToken(store$),
    switchMap(([_, accessToken]) =>
      ajax
        .get('https://api.spotify.com/v1/me', {
          authorization: accessToken,
        })
        .pipe(
          map((response) => response.response as CurrentUsersProfileResponse),
          map((response) => {
            const user: User = {
              id: response.id,
              email: response.email,
              name: response.display_name,
            };

            return loadUserBecauseAuthorizedSuccess({ user });
          }),
          catchError((error) => of(loadUserBecauseAuthorizedError({ error })))
        )
    )
  );
