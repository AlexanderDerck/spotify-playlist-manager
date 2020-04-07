import { UserState, initialUserState } from '../features/user/store';

export interface RootState {
  user: UserState;
}

export const initialRootState: RootState = {
  user: initialUserState,
};
