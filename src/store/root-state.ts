import { initialPlaylistState, PlaylistState } from './playlist/playlist.state';
import { initialUserState, UserState } from './user/user.state';

export interface RootState {
  user: UserState;
  playlist: PlaylistState;
}

export const initialRootState: RootState = {
  user: initialUserState,
  playlist: initialPlaylistState,
};
