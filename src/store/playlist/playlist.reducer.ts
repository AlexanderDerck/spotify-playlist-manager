import { calculateTrackIdentifier } from '../../functions';
import { Playlist, Track } from '../../models';
import { toStringMap } from '../utils';
import {
    loadPlaylistsAdditionalPagesSuccess, loadPlaylistsSuccess,
    loadPlaylistTracksBecausePlaylistsLoadedSuccess, loadPlaylistTracksSuccess, PlaylistAction
} from './playlist.actions';
import { initialPlaylistState, PlaylistState } from './playlist.state';

export function playlistReducer(
  state = initialPlaylistState,
  action: PlaylistAction
): PlaylistState {
  switch (action.type) {
    case loadPlaylistsSuccess.type:
    case loadPlaylistsAdditionalPagesSuccess.type:
      return {
        ...state,
        playLists: toStringMap(action.payload.playLists, (playlist) => playlist.id),
      };
    case loadPlaylistTracksSuccess.type:
      return updateStateTracksFetchedForPlaylist(
        state,
        action.payload.playlistId,
        action.payload.tracks
      );
    case loadPlaylistTracksBecausePlaylistsLoadedSuccess.type:
      // Basically the same as loadPlaylistTracksSuccess but for an array of playlist/tracks
      return action.payload.tracksByPlaylistId.reduce(
        (state, [playlistId, tracks]) =>
          updateStateTracksFetchedForPlaylist(state, playlistId, tracks),
        state
      );
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
  const mergedTrackIds = playlistToUpdate.trackIds
    .concat(tracks.map((t) => calculateTrackIdentifier(t)))
    .filter((value, index, self) => self.indexOf(value) === index); // Get unique values
  const updatedPlaylist: Playlist = {
    ...playlistToUpdate,
    trackIds: mergedTrackIds,
  };

  return {
    ...state,
    playLists: { ...state.playLists, [updatedPlaylist.id]: updatedPlaylist },
    tracks: toStringMap(tracks, calculateTrackIdentifier),
  };
}
