import { all } from 'redux-saga/effects';
import { loadPagedTracksDispatcherSaga } from './sagas/load-paged-tracks-dispatcher.saga';
import { loadPagedTracksSchedulerSaga } from './sagas/load-paged-tracks-scheduler.saga';
import { loadPagedTracksSaga } from './sagas/load-paged-tracks.saga';
import { loadPlaylistTracksSaga } from './sagas/load-playlist-tracks.saga';

export function* rootSaga() {
  yield all([
    loadPlaylistTracksSaga(),
    loadPagedTracksSchedulerSaga(),
    loadPagedTracksDispatcherSaga(),
    loadPagedTracksSaga(),
  ]);
}
