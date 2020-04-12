import { loadPagedTracksForPlaylistSuccess, LoadPlaylistTracksSagaAction } from '../actions';
import { initialTrackState, TrackState } from '../state/track.state';
import { toStringMap } from '../utils';

export function trackReducer(
  state = initialTrackState,
  action: LoadPlaylistTracksSagaAction
): TrackState {
  switch (action.type) {
    case loadPagedTracksForPlaylistSuccess.type:
      return {
        ...state,
        tracks: toStringMap(
          [...Object.values(state.tracks), ...action.payload.tracks],
          (t) => t.id
        ),
      };

    default:
      return state;
  }
}
