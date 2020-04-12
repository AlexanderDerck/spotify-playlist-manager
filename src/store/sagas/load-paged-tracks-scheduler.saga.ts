import { put, select, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { LoadPagedTracksForPlaylistTask } from '../../models';
import {
    loadPagedTracksForPlaylist, queueLoadPagedTracksForPlaylistTask,
    runLoadPagedTracksForPlaylistTask
} from '../actions';
import { getQueuedLoadTrackTasks, getRunningLoadTrackTasks } from '../selectors';

export function* loadPagedTracksSchedulerSaga() {
  while (true) {
    yield takeEvery(loadPagedTracksForPlaylist, (action) =>
      loadPagedTracksSchedulerFlow(action.payload)
    );
  }
}

function* loadPagedTracksSchedulerFlow(payload: LoadPagedTracksForPlaylistTask) {
  const runningLoadTrackTasks = yield* select(getRunningLoadTrackTasks);

  if (runningLoadTrackTasks.length > environment.ConcurrentRequestLimit) {
    yield put(queueLoadPagedTracksForPlaylistTask(payload));
    return;
  }

  const queuedLoadTrackTasks = yield* select(getQueuedLoadTrackTasks);

  if (queuedLoadTrackTasks.length > 0) {
    yield put(queueLoadPagedTracksForPlaylistTask(payload));
    yield put(
      runLoadPagedTracksForPlaylistTask(queuedLoadTrackTasks[queuedLoadTrackTasks.length - 1])
    );
  } else {
    yield put(runLoadPagedTracksForPlaylistTask(payload));
  }
}
