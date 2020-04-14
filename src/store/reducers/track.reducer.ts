import { runLoadTracksForPlaylistTaskCompleted, searchSong, TrackAction } from '../actions';
import { initialTrackState, TrackState } from '../state/track.state';
import { toStringMap } from '../utils';

export function trackReducer(state = initialTrackState, action: TrackAction): TrackState {
  switch (action.type) {
    case runLoadTracksForPlaylistTaskCompleted.type:
      const updatedTracks = {
        ...state.tracks,
        ...toStringMap(action.payload.tracks, (t) => t.id),
      };
      return {
        ...state,
        tracks: updatedTracks,
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
