import {
    loadPagedTracksForPlaylistSuccess, LoadPlaylistTracksSagaAction
} from '../actions/load-playlist-tracks.saga.actions';
import {
    changeSelectedPlaylistIds, loadPlaylistsSuccess, PlaylistAction
} from '../actions/playlist.actions';
import { initialPlaylistState, PlaylistState } from '../state/playlist.state';
import { toStringMap } from '../utils';

export function playlistReducer(
  state = initialPlaylistState,
  action: PlaylistAction | LoadPlaylistTracksSagaAction
): PlaylistState {
  switch (action.type) {
    case loadPlaylistsSuccess.type:
      return {
        ...state,
        playLists: {
          ...state.playLists,
          ...toStringMap(action.payload.playLists, (p) => p.id),
        },
      };
    case loadPagedTracksForPlaylistSuccess.type:
      const playlistToUpdate = state.playLists[action.payload.playlistId];
      return {
        ...state,
        playLists: {
          ...state.playLists,
          [action.payload.playlistId]: {
            ...playlistToUpdate,
            trackIds: [
              ...(playlistToUpdate.trackIds || []),
              ...action.payload.tracks.map((t) => t.id),
            ],
          },
        },
      };
    case changeSelectedPlaylistIds.type:
      return {
        ...state,
        selectedPlaylistIds: action.payload.playlistIds,
      };
    default:
      return state;
  }
}
