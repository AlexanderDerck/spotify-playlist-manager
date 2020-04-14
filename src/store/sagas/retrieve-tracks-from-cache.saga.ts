import { actionChannel } from 'redux-saga/effects';
import { put, take } from 'typed-redux-saga';
import { getFromLocalStorage } from '../../utils';
import {
    loadAllTracksForAllPlaylists, retrieveTracksFromCache, retrieveTracksFromCacheNotFound,
    retrieveTracksFromCacheSuccess
} from '../actions';

export function* retrieveTracksFromCacheSaga() {
  const channel = yield actionChannel(retrieveTracksFromCache);

  while (true) {
    yield take(channel);

    const tracks = getFromLocalStorage('tracks');
    if (tracks === null) {
      yield put(retrieveTracksFromCacheNotFound());
      return yield put(loadAllTracksForAllPlaylists());
    }

    return yield put(retrieveTracksFromCacheSuccess({ tracks }));
  }
}
