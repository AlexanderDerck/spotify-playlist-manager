import { all } from 'redux-saga/effects';
import { loadAllTracksForAllPlaylistsSaga } from './sagas/load-all-tracks-for-all-playlists.saga';
import { loadAllTracksForPlaylistSaga } from './sagas/load-all-tracks-for-playlist.saga';
import { runLoadTracksTasksSaga } from './sagas/run-load-tracks-tasks.saga';

export function* rootSaga() {
  yield all([
    loadAllTracksForAllPlaylistsSaga(),
    loadAllTracksForPlaylistSaga(),
    runLoadTracksTasksSaga(),
  ]);
}
