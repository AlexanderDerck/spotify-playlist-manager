import { calculateTrackIdentifier } from '../../functions';
import { Playlist, Track } from '../../models';
import {
    changeSelectedPlaylistIds, loadPlaylistsSuccess, loadPlaylistTracksSuccess, PlaylistAction
} from '../actions/playlist.actions';
import { initialPlaylistState, PlaylistState } from '../state/playlist.state';
import { toStringMap } from '../utils';

export function playlistReducer(
  state = initialPlaylistState,
  action: PlaylistAction
): PlaylistState {
  switch (action.type) {
    case loadPlaylistsSuccess.type:
      return {
        ...state,
        playLists: toStringMap(
          [...Object.values(state.playLists), ...action.payload.playLists],
          (playlist) => playlist.id
        ),
      };
    case loadPlaylistTracksSuccess.type:
      return updateStateTracksFetchedForPlaylist(
        state,
        action.payload.playlistId,
        action.payload.tracks
      );
    case changeSelectedPlaylistIds.type:
      return {
        ...state,
        selectedPlaylistIds: action.payload.playlistIds,
      };
    default:
      return state;
  }
}

/**
 * Put the fetched tracks in the store, and link the tracks to the playlist in the store
 */
function updateStateTracksFetchedForPlaylist(
  state: PlaylistState,
  playlistId: string,
  tracks: Track[]
) {
  const playlistToUpdate = state.playLists[playlistId];
  const mergedTrackIds = tracks
    .map((t) => calculateTrackIdentifier(t))
    .concat(playlistToUpdate.trackIds || [])
    .filter((value, index, self) => self.indexOf(value) === index); // Get unique values
  const updatedPlaylist: Playlist = {
    ...playlistToUpdate,
    trackIds: mergedTrackIds,
  };

  return {
    ...state,
    playLists: { ...state.playLists, [updatedPlaylist.id]: updatedPlaylist },
    tracks: toStringMap([...Object.values(state.tracks), ...tracks], calculateTrackIdentifier),
  };
}
