import { initialPlaylistState, PlaylistState } from './state/playlist.state';
import { initialUserState, UserState } from './state/user.state';

export interface RootState {
  user: UserState;
  playlist: PlaylistState;
}

export const initialRootState: RootState = {
  user: initialUserState,
  playlist: initialPlaylistState,
};
