import { all } from 'redux-saga/effects';
import { loadPlaylistTracksSaga } from './sagas/load-playlist-tracks.saga';
import { loadTracksDispatcherSaga } from './sagas/load-tracks-dispatcher.saga';
import { loadTracksSchedulerSaga } from './sagas/load-tracks-scheduler.saga';
import { loadTracksSaga } from './sagas/load-tracks.saga';

export function* rootSaga() {
  yield all([
    loadPlaylistTracksSaga(),
    loadTracksSchedulerSaga(),
    loadTracksDispatcherSaga(),
    loadTracksSaga(),
  ]);
}
