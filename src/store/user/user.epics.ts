import { Epic, ofType } from 'redux-observable';
import { NEVER } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UserAction,
  authorize,
  checkAuthorization,
  checkAuthorizationUserLoggedIn,
  checkAuthorizationUserNotLoggedIn,
} from './user.actions';

export const checkAuthorizationEpic: Epic<UserAction, UserAction> = (action$) =>
  action$.pipe(
    ofType(checkAuthorization.type),
    map((_) => {
      const url = new URL(window.location.toString());
      const hashParams = new URLSearchParams(url.hash.substr(1));
      const accessToken = hashParams.get('access_token');

      return accessToken != null
        ? checkAuthorizationUserLoggedIn({ accessToken })
        : checkAuthorizationUserNotLoggedIn();
    })
  );

export const authorizeEpic: Epic<UserAction, any> = (action$) =>
  action$.pipe(
    ofType(authorize.type),
    map((_) => {
      const queryParams = new URLSearchParams({
        client_id: '17df0cd526354633a5ab47045e8efa8c',
        response_type: 'token',
        redirect_uri: 'https://10.63.1.202:3000',
        scope: 'playlist-modify-private',
      });

      window.location.replace('https://accounts.spotify.com/authorize?' + queryParams.toString());

      return NEVER;
    })
  );

export const userEpics = [checkAuthorizationEpic, authorizeEpic];
