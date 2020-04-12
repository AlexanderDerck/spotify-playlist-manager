import { put, select, takeEvery } from 'typed-redux-saga';
import {
    loadPagedTracksForPlaylistError, loadPagedTracksForPlaylistSuccess,
    startLoadPagedTracksForPlaylist
} from '../actions';
import { getQueuedLoadTrackTasks } from '../selectors';

export function* loadPagedTracksDispatcherSaga() {
  while (true) {
    yield takeEvery(
      [loadPagedTracksForPlaylistSuccess, loadPagedTracksForPlaylistError],
      loadPagedTracksDispatcherFlow
    );
  }
}

function* loadPagedTracksDispatcherFlow() {
  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(
      startLoadPagedTracksForPlaylist(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1])
    );
  }
}
