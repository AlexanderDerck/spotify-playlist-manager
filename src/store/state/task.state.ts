import { LoadTracksForPlaylistResult, LoadTracksForPlaylistTask } from '../../models';

export interface TaskState {
  queuedLoadTrackTasks: LoadTracksForPlaylistTask[];
  runningLoadTrackTasks: LoadTracksForPlaylistTask[];
  completedLoadTrackTasks: LoadTracksForPlaylistResult[];
}

export const initialTaskState: TaskState = {
  queuedLoadTrackTasks: [],
  runningLoadTrackTasks: [],
  completedLoadTrackTasks: [],
};
