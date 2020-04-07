import { UserAction, checkAuthorizationUserLoggedIn } from './user.actions';
import { initialUserState, UserState } from './user.state';

export function userReducer(state = initialUserState, action: UserAction): UserState {
  switch (action.type) {
    case checkAuthorizationUserLoggedIn.type:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
}
