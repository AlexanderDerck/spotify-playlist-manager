import { put, select, takeEvery } from 'typed-redux-saga';
import {
    runLoadPagedTracksForPlaylistTask, runLoadPagedTracksForPlaylistTaskCompleted,
    runLoadPagedTracksForPlaylistTaskErrored
} from '../actions';
import { getQueuedLoadTrackTasks } from '../selectors';

export function* loadPagedTracksDispatcherSaga() {
  while (true) {
    yield takeEvery(
      [runLoadPagedTracksForPlaylistTaskCompleted, runLoadPagedTracksForPlaylistTaskErrored],
      loadPagedTracksDispatcherFlow
    );
  }
}

function* loadPagedTracksDispatcherFlow() {
  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(
      runLoadPagedTracksForPlaylistTask(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1])
    );
  }
}
