import { Epic, ofType } from 'redux-observable';
import { tap, map } from 'rxjs/operators';
import {
  UserAction,
  authorize,
  checkAuthorization,
  checkAuthorizationUserLoggedIn,
  checkAuthorizationUserNotLoggedIn,
} from './user.actions';
import { RootState } from '../../../store/root-state';

export const checkAuthorizationEpic: Epic<UserAction, UserAction, RootState> = (action$, state$) =>
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

export const authorizeEpic: Epic<UserAction> = (action$) =>
  action$.pipe(
    ofType(authorize.type),
    tap((_) => {
      const queryParams = new URLSearchParams({
        client_id: '17df0cd526354633a5ab47045e8efa8c',
        response_type: 'token',
        redirect_uri: 'https://10.63.1.202:3000',
      });

      window.location.replace('https://accounts.spotify.com/authorize?' + queryParams.toString());
    })
  );

export const userEpics = [checkAuthorizationEpic, authorizeEpic];
