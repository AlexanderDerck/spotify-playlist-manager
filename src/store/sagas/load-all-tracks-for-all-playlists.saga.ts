import { differenceInMilliseconds } from 'date-fns';
import { call, cancel, delay, fork, put, select, take, takeLatest } from 'typed-redux-saga';
import { Track } from '../../models';
import { durationFromMilliseconds } from '../../utils';
import {
    loadAllTracksForAllPlaylists, loadAllTracksForAllPlaylistsCompleted, loadAllTracksForPlaylist,
    loadAllTracksForPlaylistCompleted, reduceBatchOfLoadedTracksForPlaylists
} from '../actions';
import { getPlaylists } from '../selectors';
import { toStringMap } from '../utils';

export function* loadAllTracksForAllPlaylistsSaga() {
  while (true) {
    yield takeLatest(loadAllTracksForAllPlaylists, loadAllTracksForAllPlaylistsFlow);
  }
}

function* loadAllTracksForAllPlaylistsFlow() {
  const timeStarted = new Date();
  const playlists = yield* select(getPlaylists);
  const playlistsLoading = new Set<string>();
  const tracksByPlaylistIdMap = new Map<string, Track[]>();

  for (const playlist of playlists) {
    playlistsLoading.add(playlist.id);
    yield put(loadAllTracksForPlaylist({ playlistId: playlist.id }));
  }

  const batchReduceTask = yield* fork(batchReduceLoadTracksTasksFlow, tracksByPlaylistIdMap);
  yield* call(waitForCompletionFlow, playlistsLoading, tracksByPlaylistIdMap);
  yield cancel(batchReduceTask);

  const timeEnded = new Date();
  const elapsed = durationFromMilliseconds(differenceInMilliseconds(timeEnded, timeStarted));

  yield put(loadAllTracksForAllPlaylistsCompleted({ elapsed }));
}

function* waitForCompletionFlow(playlistsLoading: Set<string>, tracksByPlaylistIdMap: Map<string, Track[]>) {
  while (playlistsLoading.size > 0) {
    const completedPlaylist = yield* take<ReturnType<typeof loadAllTracksForPlaylistCompleted>>(loadAllTracksForPlaylistCompleted);
    const { playlistId, tracks } = completedPlaylist.payload;

    tracksByPlaylistIdMap.set(playlistId, tracks);
    playlistsLoading.delete(playlistId);
  }
}

function* batchReduceLoadTracksTasksFlow(tracksByPlaylistIdMap: Map<string, Track[]>) {
  try {
    while (true) {
      if (tracksByPlaylistIdMap.size > 0) {
        yield put(reduceBatchOfLoadedTracksForPlaylists({ tracksByPlaylistId: toStringMap(tracksByPlaylistIdMap) }));
        tracksByPlaylistIdMap.clear();
      }

      yield delay(1000);
    }
  } finally {
    yield put(reduceBatchOfLoadedTracksForPlaylists({ tracksByPlaylistId: toStringMap(tracksByPlaylistIdMap) }));
  }
}
