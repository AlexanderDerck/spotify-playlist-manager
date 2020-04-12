import { call, put, select, take, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { Playlist } from '../../models';
import { PlaylistTrackResponse } from '../../typings/spotify-api';
import {
    loadAllTracksForPlaylist, loadAllTracksForPlaylistError, loadPagedTracksForPlaylist,
    loadPagedTracksForPlaylistError, loadPagedTracksForPlaylistSuccess,
    loadPlaylistTracksSagaCompleted, loadPlaylistTracksSagaStart,
    scheduleLoadPagedTracksForPlaylistAction
} from '../actions/load-playlist-tracks.saga.actions';
import { mapToTrack } from '../mappers/track.mappers';
import { getBearerToken, getPlaylists } from '../selectors';

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
    yield put(scheduleLoadPagedTracksForPlaylistAction({ playlistId: playlist.id, page: i }));
  }

  // yield put(loadAllTracksForPlaylistSuccess({ playlistId: playlist.id }));
}
const queuedActions: { playlistId: string; page: number }[] = [];
const runningActions = new Map<string, { playlistId: string; page: number }>();

export function* loadPagedTracksForPlaylistSchedulerSaga() {
  while (true) {
    yield takeEvery(
      scheduleLoadPagedTracksForPlaylistAction,
      loadPagedTracksForPlaylistSchedulerFlow
    );
  }
}

function* loadPagedTracksForPlaylistSchedulerFlow() {
  const action = yield* take<ReturnType<typeof scheduleLoadPagedTracksForPlaylistAction>>(
    scheduleLoadPagedTracksForPlaylistAction
  );
  queuedActions.push({ ...action.payload });
}

export function* loadPagedTracksForPlaylistDispatcherSaga() {
  while (true) {
    type ActionTypes = ReturnType<
      | typeof scheduleLoadPagedTracksForPlaylistAction
      | typeof loadPagedTracksForPlaylistSuccess
      | typeof loadPagedTracksForPlaylistError
    >;
    const action = yield* take<ActionTypes>([
      scheduleLoadPagedTracksForPlaylistAction,
      loadPagedTracksForPlaylistSuccess,
      loadPagedTracksForPlaylistError,
    ]);

    if (
      action.type === loadPagedTracksForPlaylistSuccess.type ||
      action.type === loadPagedTracksForPlaylistError.type
    ) {
      runningActions.delete(action.payload.playlistId + action.payload.page);
    }

    if (runningActions.size < environment.ConcurrentRequestLimit && queuedActions.length) {
      const actionToDispatch = queuedActions.pop();
      const { playlistId, page } = actionToDispatch;

      yield put(
        loadPagedTracksForPlaylist({
          playlistId: playlistId,
          page: page,
        })
      );
      runningActions.set(playlistId + page, actionToDispatch);
    }
  }
}

export function* loadPagedPlaylistTracksSaga() {
  while (true) {
    yield takeEvery(loadPagedTracksForPlaylist, (args) =>
      loadPagedPlaylistTracksFlow(args.payload.playlistId, args.payload.page)
    );
  }
}

function* loadPagedPlaylistTracksFlow(playlistId: string, page: number) {
  const bearerToken = yield* select(getBearerToken);

  try {
    const response = yield* call(getPlaylistTracks, playlistId, bearerToken, page);
    const tracks = response.items.map(mapToTrack);

    yield put(loadPagedTracksForPlaylistSuccess({ playlistId, page, tracks }));
  } catch (error) {
    yield put(loadPagedTracksForPlaylistError({ playlistId, page, error }));
  }
}

function getPlaylistTracks(
  playlistId: string,
  bearerToken: string,
  page: number
): Promise<PlaylistTrackResponse> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?`;
  const offset = page * environment.GetTracksPagingLimit;
  const queryParams = new URLSearchParams({
    limit: environment.GetTracksPagingLimit.toString(),
    offset: offset.toString(),
    fields: 'total,limit,items(track(id,name,album,artists))',
  });

  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('authorization', bearerToken);

  return fetch(url + queryParams.toString(), {
    method: 'GET',
    headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
