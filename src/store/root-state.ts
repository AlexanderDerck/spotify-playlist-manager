import { initialPlaylistState, PlaylistState } from './state/playlist.state';
import { initialTrackState, TrackState } from './state/track.state';
import { initialUserState, UserState } from './state/user.state';

export interface RootState {
  playlist: PlaylistState;
  track: TrackState;
  user: UserState;
}

export const initialRootState: RootState = {
  playlist: initialPlaylistState,
  track: initialTrackState,
  user: initialUserState,
};
