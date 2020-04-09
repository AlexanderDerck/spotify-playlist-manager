import { calculateTrackIdentifier } from '../../functions';
import { Playlist } from '../../models';
import { toStringMap } from '../utils';
import {
    loadPlaylistsSuccess, loadPlaylistTracksSuccess, PlaylistAction
} from './playlist.actions';
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
    case loadPlaylistTracksSuccess.type: {
      const playlistToUpdate = state.playLists[action.payload.playlistId];
      const mergedTrackIds = playlistToUpdate.trackIds
        .concat(action.payload.tracks.map((t) => calculateTrackIdentifier(t)))
        .filter((value, index, self) => self.indexOf(value) === index); // Get unique values
      const updatedPlaylist: Playlist = {
        ...playlistToUpdate,
        trackIds: mergedTrackIds,
      };

      return {
        ...state,
        playLists: { ...state.playLists, [updatedPlaylist.id]: updatedPlaylist },
        tracks: toStringMap(action.payload.tracks, calculateTrackIdentifier),
      };
    }
    default:
      return state;
  }
}
