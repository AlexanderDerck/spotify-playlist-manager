import {
    batchReduceLoadTracksForPlaylistTask, queueLoadTracksForPlaylistTask,
    runLoadTracksForPlaylistTask, runLoadTracksForPlaylistTaskCompleted,
    runLoadTracksForPlaylistTaskErrored, TrackAction
} from '../actions';
import { initialTaskState, TaskState } from '../state/task.state';

export function taskReducer(state = initialTaskState, action: TrackAction): TaskState {
  switch (action.type) {
    case queueLoadTracksForPlaylistTask.type:
      return {
        ...state,
        queuedLoadTrackTasks: [...state.queuedLoadTrackTasks, { ...action.payload }],
      };
    case runLoadTracksForPlaylistTask.type:
      return {
        ...state,
        runningLoadTrackTasks: [...state.runningLoadTrackTasks, { ...action.payload }],
        queuedLoadTrackTasks: state.queuedLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    case runLoadTracksForPlaylistTaskCompleted.type:
      return {
        ...state,
        completedLoadTrackTasks: [...state.completedLoadTrackTasks, { ...action.payload }],
        runningLoadTrackTasks: state.runningLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    case runLoadTracksForPlaylistTaskErrored.type:
      return {
        ...state,
        runningLoadTrackTasks: state.runningLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    case batchReduceLoadTracksForPlaylistTask.type:
      return {
        ...state,
        completedLoadTrackTasks: [],
      };
    default:
      return state;
  }
}
