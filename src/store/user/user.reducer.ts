import {
  UserAction,
  checkAuthorizationAuthorized,
  loadUserBecauseAuthorizedSuccess,
} from './user.actions';
import { UserState, initialUserState } from './user.state';

export function userReducer(state = initialUserState, action: UserAction): UserState {
  switch (action.type) {
    case checkAuthorizationAuthorized.type:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case loadUserBecauseAuthorizedSuccess.type:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
