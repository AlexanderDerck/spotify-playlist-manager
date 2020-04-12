import { initialPlaylistState, PlaylistState } from './state/playlist.state';
import { initialTaskState, TaskState } from './state/task.state';
import { initialTrackState, TrackState } from './state/track.state';
import { initialUserState, UserState } from './state/user.state';

export interface RootState {
  playlist: PlaylistState;
  task: TaskState;
  track: TrackState;
  user: UserState;
}

export const initialRootState: RootState = {
  playlist: initialPlaylistState,
  task: initialTaskState,
  track: initialTrackState,
  user: initialUserState,
};
