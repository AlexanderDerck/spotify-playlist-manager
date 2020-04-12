import { put, select, take, takeLatest } from 'typed-redux-saga';
import {
    loadAllTracksForAllPlaylists, loadAllTracksForAllPlaylistsCompleted, loadAllTracksForPlaylist,
    loadAllTracksForPlaylistCompleted
} from '../actions';
import { getPlaylists } from '../selectors';

export function* loadAllTracksForAllPlaylistsSaga() {
  while (true) {
    yield takeLatest(loadAllTracksForAllPlaylists, loadAllTracksForAllPlaylistsFlow);
  }
}

function* loadAllTracksForAllPlaylistsFlow() {
  const playlists = yield* select(getPlaylists);
  const playlistsLoading = new Set<string>();

  for (const playlist of playlists) {
    playlistsLoading.add(playlist.id);
    yield put(loadAllTracksForPlaylist({ playlistId: playlist.id }));
  }

  while (playlistsLoading.size > 0) {
    const completedPlaylist = yield* take<ReturnType<typeof loadAllTracksForPlaylistCompleted>>(
      loadAllTracksForPlaylistCompleted
    );
    playlistsLoading.delete(completedPlaylist.payload.playlistId);
  }

  yield put(loadAllTracksForAllPlaylistsCompleted());
}