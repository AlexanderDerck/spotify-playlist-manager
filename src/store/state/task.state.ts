import { LoadTracksForPlaylistTask } from '../../models';

export interface TaskState {
  queuedLoadTrackTasks: LoadTracksForPlaylistTask[];
  runningLoadTrackTasks: LoadTracksForPlaylistTask[];
}

export const initialTaskState: TaskState = {
  queuedLoadTrackTasks: [],
  runningLoadTrackTasks: [],
};
