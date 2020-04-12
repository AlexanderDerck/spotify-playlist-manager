import { put, select, takeEvery } from 'typed-redux-saga';
import {
    runLoadTracksForPlaylistTask, runLoadTracksForPlaylistTaskCompleted,
    runLoadTracksForPlaylistTaskErrored
} from '../actions';
import { getQueuedLoadTrackTasks } from '../selectors';

export function* loadTracksDispatcherSaga() {
  while (true) {
    yield takeEvery(
      [runLoadTracksForPlaylistTaskCompleted, runLoadTracksForPlaylistTaskErrored],
      loadTracksDispatcherFlow
    );
  }
}

function* loadTracksDispatcherFlow() {
  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(runLoadTracksForPlaylistTask(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1]));
  }
}
