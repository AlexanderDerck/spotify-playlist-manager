import {
    loadAllTracksForPlaylist, loadAllTracksForPlaylistCompleted,
    reduceBatchOfLoadedTracksForPlaylists, TrackAction
} from '../actions';
import {
    changeSelectedPlaylistIds, linkTracksToPlaylistsFromCacheSuccess, loadPlaylistsSuccess,
    PlaylistAction
} from '../actions/playlist.actions';
import { initialPlaylistState, PlaylistState } from '../state/playlist.state';
import { StringMap, toStringMap } from '../utils';

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
          ...toStringMap(action.payload.playlists, (p) => p.id),
        },
        playlistsTracksLoaded: {
          ...(state.playlistsTracksLoaded || {}),
          ...action.payload.playlists.reduce(
            (map, playlist) => ({ ...map, [playlist.id]: false }),
            {}
          ),
        },
      };
    case loadAllTracksForPlaylist.type:
      return {
        ...state,
        playlistsTracksLoaded: {
          ...(state.playlistsTracksLoaded || {}),
          [action.payload.playlistId]: false,
        },
      };
    case loadAllTracksForPlaylistCompleted.type:
      return {
        ...state,
        trackIdsByPlaylistId: {
          ...state.trackIdsByPlaylistId,
          [action.payload.playlistId]: [...action.payload.tracks.map((t) => t.id)],
        },
        playlistsTracksLoaded: {
          ...state.playlistsTracksLoaded,
          [action.payload.playlistId]: true,
        },
      };
    case reduceBatchOfLoadedTracksForPlaylists.type:
      return reduceBatchOfLoadTracksForPlaylistResultsReducer(state, action);
    case linkTracksToPlaylistsFromCacheSuccess.type:
      return {
        ...state,
        trackIdsByPlaylistId: {
          ...action.payload.trackIdsByPlaylistId,
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

function reduceBatchOfLoadTracksForPlaylistResultsReducer(
  state: PlaylistState,
  action: ReturnType<typeof reduceBatchOfLoadedTracksForPlaylists>
): PlaylistState {
  const trackIdsByPlaylistIdMap: StringMap<string[]> = {};

  for (const [playlistId, tracks] of Object.entries(action.payload.tracksByPlaylistId)) {
    const trackIds = new Set(state.trackIdsByPlaylistId[playlistId] || []);

    for (const track of tracks) {
      trackIds.add(track.id);
    }

    trackIdsByPlaylistIdMap[playlistId] = [...trackIds.values()];
  }

  return {
    ...state,
    ...trackIdsByPlaylistIdMap,
  };
}
