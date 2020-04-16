import { differenceInMilliseconds } from 'date-fns';
import { actionChannel } from 'redux-saga/effects';
import { put, take } from 'typed-redux-saga';
import { durationFromMilliseconds, getFromLocalStorage } from '../../utils';
import {
    loadAllTracksForAllPlaylists, retrieveTracksFromCache, retrieveTracksFromCacheNotFound,
    retrieveTracksFromCacheSuccess
} from '../actions';

export function* retrieveTracksFromCacheSaga() {
  const channel = yield actionChannel(retrieveTracksFromCache);

  while (true) {
    yield take(channel);

    const startTime = new Date();
    const tracks = getFromLocalStorage('tracks');
    if (tracks === null) {
      yield put(retrieveTracksFromCacheNotFound());
      return yield put(loadAllTracksForAllPlaylists());
    }

    const elapsed = durationFromMilliseconds(differenceInMilliseconds(new Date(), startTime));

    return yield put(retrieveTracksFromCacheSuccess({ tracks, elapsed }));
  }
}
