import { LoadPagedTracksForPlaylistTask } from '../../models';

export interface TaskState {
  queuedLoadTrackTasks: LoadPagedTracksForPlaylistTask[];
  runningLoadTrackTasks: LoadPagedTracksForPlaylistTask[];
}

export const initialTaskState: TaskState = {
  queuedLoadTrackTasks: [],
  runningLoadTrackTasks: [],
};
