import { put, select, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { LoadTracksForPlaylistTask } from '../../models';
import {
    loadTracksForPlaylist, queueLoadTracksForPlaylistTask, runLoadTracksForPlaylistTask
} from '../actions';
import { getQueuedLoadTrackTasks, getRunningLoadTrackTasks } from '../selectors';

export function* loadTracksSchedulerSaga() {
  while (true) {
    yield takeEvery(loadTracksForPlaylist, (action) => loadTracksSchedulerFlow(action.payload));
  }
}

function* loadTracksSchedulerFlow(payload: LoadTracksForPlaylistTask) {
  const runningLoadTrackTasks = yield* select(getRunningLoadTrackTasks);

  if (runningLoadTrackTasks.length > environment.ConcurrentRequestLimit) {
    yield put(queueLoadTracksForPlaylistTask(payload));
    return;
  }

  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(queueLoadTracksForPlaylistTask(payload));
    yield put(runLoadTracksForPlaylistTask(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1]));
  } else {
    yield put(runLoadTracksForPlaylistTask(payload));
  }
}
