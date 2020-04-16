import { call, put, select, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { PlaylistTrackResponse } from '../../typings/spotify-api';
import {
    runLoadTracksForPlaylistTask, runLoadTracksForPlaylistTaskCompleted,
    runLoadTracksForPlaylistTaskErrored
} from '../actions';
import { mapToTrack } from '../mappers/track.mappers';
import { getBearerToken } from '../selectors';

export function* runLoadTracksTasksSaga() {
  while (true) {
    yield takeEvery(runLoadTracksForPlaylistTask, (action) => runLoadTracksTasksFlow(action.payload.playlistId, action.payload.page));
  }
}

function* runLoadTracksTasksFlow(playlistId: string, page: number) {
  const bearerToken = yield* select(getBearerToken);

  try {
    const response = yield* call(getPlaylistTracks, playlistId, bearerToken, page);
    const tracks = response.items.map(mapToTrack);

    yield put(runLoadTracksForPlaylistTaskCompleted({ playlistId, page, tracks }));
  } catch (error) {
    yield put(runLoadTracksForPlaylistTaskErrored({ playlistId, page, error }));
  }
}

function getPlaylistTracks(playlistId: string, bearerToken: string, page: number): Promise<PlaylistTrackResponse> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?`;
  const offset = page * environment.GetTracksPagingLimit;
  const queryParams = new URLSearchParams({
    limit: environment.GetTracksPagingLimit.toString(),
    offset: offset.toString(),
    fields: 'total,limit,items(track(id,name,album,artists,uri,duration_ms),is_local)',
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
