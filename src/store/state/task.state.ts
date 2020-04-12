import { LoadPagedTracksForPlaylistPayload } from '../../models';

export interface TaskState {
  queuedLoadTrackTasks: LoadPagedTracksForPlaylistPayload[];
  runningLoadTrackTasks: LoadPagedTracksForPlaylistPayload[];
}

export const initialTaskState: TaskState = {
  queuedLoadTrackTasks: [],
  runningLoadTrackTasks: [],
};
