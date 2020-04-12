import { put, select, take, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import {
    loadAllTracksForPlaylist, loadAllTracksForPlaylistCompleted, queueLoadTracksForPlaylistTask,
    runLoadTracksForPlaylistTaskCompleted, runLoadTracksForPlaylistTaskErrored
} from '../actions';
import { getPlaylistsMap } from '../selectors';

export function* loadAllTracksForPlaylistSaga() {
  while (true) {
    yield takeEvery(loadAllTracksForPlaylist, (action) =>
      loadAllTracksForPlaylistFlow(action.payload.playlistId)
    );
  }
}

function* loadAllTracksForPlaylistFlow(playlistId: string) {
  const playlistsMap = yield* select(getPlaylistsMap);
  const playlist = playlistsMap[playlistId];
  const requestsNeeded = Math.ceil(playlist.totalTracks / environment.GetTracksPagingLimit);
  const pagesLoading = new Set<number>();

  for (let i = 0; i < requestsNeeded; i++) {
    pagesLoading.add(i);
    yield put(queueLoadTracksForPlaylistTask({ playlistId: playlistId, page: i }));
  }

  while (pagesLoading.size > 0) {
    type ActionTypes = ReturnType<
      typeof runLoadTracksForPlaylistTaskCompleted | typeof runLoadTracksForPlaylistTaskErrored
    >;
    const taskCompletedAction = yield* take<ActionTypes>([
      runLoadTracksForPlaylistTaskCompleted,
      runLoadTracksForPlaylistTaskErrored,
    ]);

    if (taskCompletedAction.payload.playlistId === playlistId) {
      pagesLoading.delete(taskCompletedAction.payload.page);
    }
  }

  yield put(loadAllTracksForPlaylistCompleted({ playlistId }));
}
