import { all } from 'redux-saga/effects';
import { loadAllTracksForAllPlaylistsSaga } from './sagas/load-all-tracks-for-all-playlists.saga';
import { loadAllTracksForPlaylistSaga } from './sagas/load-all-tracks-for-playlist.saga';
import { retrieveTracksFromCacheSaga } from './sagas/retrieve-tracks-from-cache.saga';
import { runLoadTracksTasksSaga } from './sagas/run-load-tracks-tasks.saga';
import { saveInLocalStorageSaga } from './sagas/save-in-local-storage.saga';
import { scheduleLoadTracksTaskSaga } from './sagas/schedule-load-tracks-task.saga';

export function* rootSaga() {
  yield all([
    retrieveTracksFromCacheSaga(),
    loadAllTracksForAllPlaylistsSaga(),
    loadAllTracksForPlaylistSaga(),
    scheduleLoadTracksTaskSaga(),
    runLoadTracksTasksSaga(),
    saveInLocalStorageSaga(),
  ]);
}
