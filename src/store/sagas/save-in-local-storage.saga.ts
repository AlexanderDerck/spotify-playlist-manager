import { select, takeEvery } from 'typed-redux-saga';
import { saveInLocalStorage } from '../../utils';
import { loadAllTracksForAllPlaylistsCompleted } from '../actions';
import { getPlaylistsMap, getTrackIdsByPlaylistIdMap, getTracksMap } from '../selectors';
import { toStringMap } from '../utils';

export function* saveInLocalStorageSaga() {
  while (true) {
    yield takeEvery(loadAllTracksForAllPlaylistsCompleted, saveInLocalStorageFlow);
  }
}

export function* saveInLocalStorageFlow() {
  const tracksMap = yield* select(getTracksMap);
  if (tracksMap.size) {
    saveInLocalStorage('tracks', toStringMap(tracksMap));
  }

  const playlistsMap = yield* select(getPlaylistsMap);
  if (playlistsMap.size) {
    saveInLocalStorage('playlists', toStringMap(playlistsMap));
  }

  const trackIdsByPlaylistIdMap = yield* select(getTrackIdsByPlaylistIdMap);
  if (trackIdsByPlaylistIdMap.size) {
    saveInLocalStorage('trackIdsByPlaylistId', toStringMap(trackIdsByPlaylistIdMap));
  }
}
