import { call, put, select, takeEvery } from 'typed-redux-saga';
import { environment } from '../../environment';
import { PlaylistTrackResponse } from '../../typings/spotify-api';
import {
    loadPagedTracksForPlaylistError, loadPagedTracksForPlaylistSuccess,
    startLoadPagedTracksForPlaylist
} from '../actions';
import { mapToTrack } from '../mappers/track.mappers';
import { getBearerToken } from '../selectors';

export function* loadPagedTracksSaga() {
  while (true) {
    yield takeEvery(startLoadPagedTracksForPlaylist, (action) =>
      loadPagedTracksFlow(action.payload.playlistId, action.payload.page)
    );
  }
}

function* loadPagedTracksFlow(playlistId: string, page: number) {
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
