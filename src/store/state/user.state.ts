import { User } from '../../models';

export interface UserState {
  accessToken: string;
  user: User;
}

export const initialUserState: UserState = {
  accessToken: null,
  user: null,
};
