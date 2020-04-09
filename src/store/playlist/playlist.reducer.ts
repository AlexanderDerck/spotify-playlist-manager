import { toStringMap } from '../utils';
import { loadPlaylistsSuccess, PlaylistAction } from './playlist.actions';
import { initialPlaylistState, PlaylistState } from './playlist.state';

export function playlistReducer(
  state = initialPlaylistState,
  action: PlaylistAction
): PlaylistState {
  switch (action.type) {
    case loadPlaylistsSuccess.type:
      return {
        ...state,
        playLists: toStringMap(action.payload.playLists, (playlist) => playlist.id),
      };
    default:
      return state;
  }
}
