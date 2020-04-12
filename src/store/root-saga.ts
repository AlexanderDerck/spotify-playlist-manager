import { all } from 'redux-saga/effects';
import {
    loadPagedPlaylistTracksSaga, loadPagedTracksForPlaylistDispatcherSaga,
    loadPagedTracksForPlaylistSchedulerSaga, loadPlaylistTracksSaga
} from './sagas/load-playlist-tracks.saga';

export function* rootSaga() {
  yield all([
    loadPlaylistTracksSaga(),
    loadPagedTracksForPlaylistSchedulerSaga(),
    loadPagedTracksForPlaylistDispatcherSaga(),
    loadPagedPlaylistTracksSaga(),
  ]);
}
