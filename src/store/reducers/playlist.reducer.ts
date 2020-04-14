import {
    loadAllTracksForPlaylist, loadAllTracksForPlaylistCompleted, TrackAction
} from '../actions';
import {
    changeSelectedPlaylistIds, loadPlaylistsSuccess, PlaylistAction
} from '../actions/playlist.actions';
import { initialPlaylistState, PlaylistState } from '../state/playlist.state';
import { toStringMap } from '../utils';

export function playlistReducer(
  state = initialPlaylistState,
  action: PlaylistAction | TrackAction
): PlaylistState {
  switch (action.type) {
    case loadPlaylistsSuccess.type:
      return {
        ...state,
        playLists: {
          ...state.playLists,
          ...toStringMap(action.payload.playLists, (p) => p.id),
        },
        playlistsTracksLoaded: {
          ...state.playlistsTracksLoaded,
          ...action.payload.playLists.reduce(
            (map, playlist) => ({ ...map, [playlist.id]: false }),
            {}
          ),
        },
      };
    case loadAllTracksForPlaylist.type:
      return {
        ...state,
        playlistsTracksLoaded: {
          ...state.playlistsTracksLoaded,
          [action.payload.playlistId]: false,
        },
      };
    case loadAllTracksForPlaylistCompleted.type:
      const playlistToUpdate = state.playLists[action.payload.playlistId];
      return {
        ...state,
        playLists: {
          ...state.playLists,
          [action.payload.playlistId]: {
            ...playlistToUpdate,
            trackIds: [...playlistToUpdate.trackIds, ...action.payload.tracks.map((t) => t.id)],
          },
        },
        playlistsTracksLoaded: {
          ...state.playlistsTracksLoaded,
          [action.payload.playlistId]: true,
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
