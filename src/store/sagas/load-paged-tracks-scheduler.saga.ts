import { put, select, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { LoadPagedTracksForPlaylistPayload } from '../../models';
import {
    loadPagedTracksForPlaylist, queueLoadPagedTracksForPlaylist, startLoadPagedTracksForPlaylist
} from '../actions';
import { getQueuedLoadTrackTasks, getRunningLoadTrackTasks } from '../selectors';

export function* loadPagedTracksSchedulerSaga() {
  while (true) {
    yield takeEvery(loadPagedTracksForPlaylist, (action) =>
      loadPagedTracksSchedulerFlow(action.payload)
    );
  }
}

function* loadPagedTracksSchedulerFlow(payload: LoadPagedTracksForPlaylistPayload) {
  const runningLoadTrackTasks = yield* select(getRunningLoadTrackTasks);

  if (runningLoadTrackTasks.length > environment.ConcurrentRequestLimit) {
    yield put(queueLoadPagedTracksForPlaylist(payload));
    return;
  }

  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(queueLoadPagedTracksForPlaylist(payload));
    yield put(
      startLoadPagedTracksForPlaylist(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1])
    );
  } else {
    yield put(startLoadPagedTracksForPlaylist(payload));
  }
}
