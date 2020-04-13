import { buffers, channel as createChannel, Channel } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { call, put, select, take } from 'typed-redux-saga';
import { environment } from '../../environment';
import { PlaylistTrackResponse } from '../../typings/spotify-api';
import {
    loadPagedTracksForPlaylist, loadPagedTracksForPlaylistError, loadPagedTracksForPlaylistSuccess
} from '../actions';
import { mapToTrack } from '../mappers/track.mappers';
import { getBearerToken } from '../selectors';

export function* runLoadTracksTasksSaga() {
  const channel = yield call(createChannel, buffers.expanding());

  for (let i = 0; i < environment.ConcurrentRequestLimit; i++) {
    yield fork(runLoadTracksForPlaylistTaskWorker, channel);
  }

  while (true) {
    const action = yield take(loadPagedTracksForPlaylist);
    yield put(channel, action);
  }
}

function* runLoadTracksForPlaylistTaskWorker(channel: Channel<ReturnType<typeof loadPagedTracksForPlaylist>>) {
  while (true) {
    const action = yield* take(channel);
    const bearerToken = yield* select(getBearerToken);
    const { playlistId, page } = action.payload;

    try {
      const response = yield* call(getPlaylistTracks, playlistId, bearerToken, page);
      const tracks = response.items.map(mapToTrack);

      yield put(loadPagedTracksForPlaylistSuccess({ playlistId, page, tracks }));
    } catch (error) {
      yield put(loadPagedTracksForPlaylistError({ playlistId, page, error }));
    }
  }
}

function getPlaylistTracks(playlistId: string, bearerToken: string, page: number): Promise<PlaylistTrackResponse> {
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
