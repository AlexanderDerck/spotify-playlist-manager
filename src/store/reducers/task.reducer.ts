import {
    loadPagedTracksForPlaylistError, loadPagedTracksForPlaylistSuccess,
    queueLoadPagedTracksForPlaylist, startLoadPagedTracksForPlaylist, TaskAction, TrackAction
} from '../actions';
import { initialTaskState, TaskState } from '../state/task.state';

export function taskReducer(state = initialTaskState, action: TaskAction | TrackAction): TaskState {
  switch (action.type) {
    case queueLoadPagedTracksForPlaylist.type:
      return {
        ...state,
        queuedLoadTrackTasks: [...state.queuedLoadTrackTasks, { ...action.payload }],
      };
    case startLoadPagedTracksForPlaylist.type:
      return {
        ...state,
        runningLoadTrackTasks: [...state.runningLoadTrackTasks, { ...action.payload }],
        queuedLoadTrackTasks: state.queuedLoadTrackTasks.filter(
          (t) => t.playlistId !== action.payload.playlistId || t.page !== action.payload.page
        ),
      };
    case loadPagedTracksForPlaylistSuccess.type:
    case loadPagedTracksForPlaylistError.type:
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
