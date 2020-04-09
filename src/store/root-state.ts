import { initialUserState, UserState } from './user/user.state';

export interface RootState {
  user: UserState;
}

export const initialRootState: RootState = {
  user: initialUserState,
};
