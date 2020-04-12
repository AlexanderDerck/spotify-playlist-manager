import { call, put, select, take } from 'typed-redux-saga';
import { environment } from '../../environment';
import { Playlist } from '../../models';
import { loadPagedTracksForPlaylist } from '../actions';
import {
    loadAllTracksForPlaylist, loadAllTracksForPlaylistError, loadPlaylistTracksSagaCompleted,
    loadPlaylistTracksSagaStart
} from '../actions/load-playlist-tracks.saga.actions';
import { getPlaylists } from '../selectors';

export function* loadPlaylistTracksSaga() {
  while (true) {
    yield take(loadPlaylistTracksSagaStart);

    const playlists = getPlaylists(yield select());

    for (const playlist of playlists) {
      try {
        yield call(loadTracksForPlaylistFlow, playlist);
      } catch (error) {
        yield put(
          loadAllTracksForPlaylistError({ playlistId: playlist.id, error: error.toString() })
        );
      }
    }

    yield put(loadPlaylistTracksSagaCompleted());
  }
}

function* loadTracksForPlaylistFlow(playlist: Playlist) {
  yield put(loadAllTracksForPlaylist({ playlistId: playlist.id }));

  const actionsToQueue = Math.ceil(playlist.totalTracks / environment.GetTracksPagingLimit);
  for (let i = 0; i < actionsToQueue; i++) {
    yield put(loadPagedTracksForPlaylist({ playlistId: playlist.id, page: i }));
  }
}
