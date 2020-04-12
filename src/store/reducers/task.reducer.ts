import {
    queueLoadPagedTracksForPlaylistTask, runLoadPagedTracksForPlaylistTask,
    runLoadPagedTracksForPlaylistTaskCompleted, runLoadPagedTracksForPlaylistTaskErrored,
    TrackAction
} from '../actions';
import { initialTaskState, TaskState } from '../state/task.state';

export function taskReducer(state = initialTaskState, action: TrackAction): TaskState {
  switch (action.type) {
    case queueLoadPagedTracksForPlaylistTask.type:
      return {
        ...state,
        queuedLoadTrackTasks: [...state.queuedLoadTrackTasks, { ...action.payload }],
      };
    case runLoadPagedTracksForPlaylistTask.type:
      return {
        ...state,
        runningLoadTrackTasks: [...state.runningLoadTrackTasks, { ...action.payload }],
        queuedLoadTrackTasks: state.queuedLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    case runLoadPagedTracksForPlaylistTaskCompleted.type:
    case runLoadPagedTracksForPlaylistTaskErrored.type:
      return {
        ...state,
        runningLoadTrackTasks: state.runningLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    default:
      return state;
  }
}
