import { all } from 'redux-saga/effects';
import { batchReduceLoadTracksTasksSaga } from './sagas/batch-reduce-load-tracks-tasks.saga';
import { loadAllTracksForAllPlaylistsSaga } from './sagas/load-all-tracks-for-all-playlists.saga';
import { loadAllTracksForPlaylistSaga } from './sagas/load-all-tracks-for-playlist.saga';
import { loadTracksTaskSchedulerSaga } from './sagas/load-tracks-task-scheduler.saga';
import { runLoadTracksTasksSaga } from './sagas/run-load-tracks-tasks.saga';

export function* rootSaga() {
  yield all([
    loadAllTracksForAllPlaylistsSaga(),
    loadAllTracksForPlaylistSaga(),
    loadTracksTaskSchedulerSaga(),
    runLoadTracksTasksSaga(),
    batchReduceLoadTracksTasksSaga(),
  ]);
}
