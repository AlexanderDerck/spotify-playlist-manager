export interface UserState {
  accessToken: string | null;
}

export const initialUserState: UserState = {
  accessToken: null,
};
