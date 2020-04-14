import {
    reduceBatchOfLoadedTracksForPlaylists, retrieveTracksFromCacheSuccess, searchSong, TrackAction
} from '../actions';
import { initialTrackState, TrackState } from '../state/track.state';
import { toStringMap } from '../utils';

export function trackReducer(state = initialTrackState, action: TrackAction): TrackState {
  switch (action.type) {
    case retrieveTracksFromCacheSuccess.type:
      return {
        ...state,
        tracks: { ...state.tracks, ...action.payload.tracks },
      };
    case reduceBatchOfLoadedTracksForPlaylists.type:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          ...toStringMap(
            Object.values(action.payload.tracksByPlaylistId).flatMap((tracks) => tracks),
            (t) => t.id
          ),
        },
      };
    case searchSong.type:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    default:
      return state;
  }
}
