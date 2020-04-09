import {
  checkAuthorizationAuthorized,
  UserAction,
  loadUserBecauseAuthorizedSuccess,
} from './user.actions';
import { initialUserState, UserState } from './user.state';

export function userReducer(state = initialUserState, action: UserAction): UserState {
  switch (action.type) {
    case checkAuthorizationAuthorized.type:
      return {
        ...state,
        accessToken: `Bearer ${action.payload.accessToken}`,
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
