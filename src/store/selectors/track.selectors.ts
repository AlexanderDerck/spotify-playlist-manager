import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-state';
import { getSelectedPlaylists } from './playlist.selectors';

export const getTrackState = (state: RootState) => state.track;

export const getTracksMap = createSelector(
  getTrackState,
  (state) => new Map(Object.entries(state.tracks))
);

export const getFilteredTracksForSelectedPlaylistIds = createSelector(
  getSelectedPlaylists,
  getTracksMap,
  (selectedPlaylists, tracksMap) => {
    // If no playlists selected, show all songs
    if (selectedPlaylists.length === 0) {
      return [...tracksMap.values()];
    }

    return [...new Set(selectedPlaylists.flatMap((p) => p.trackIds))].map((trackId) =>
      tracksMap.get(trackId)
    );
  }
);
