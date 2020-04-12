import { createSelector } from '@reduxjs/toolkit';
import { Track } from '../../models';
import { RootState } from '../root-state';
import { getSelectedPlaylists } from './playlist.selectors';

export const getTrackState = (state: RootState) => state.track;

export const getTracksMap = createSelector(getTrackState, (state) => state.tracks);

export const getTracksForSelectedPlaylistIds = createSelector(
  getSelectedPlaylists,
  getTracksMap,
  (playlists, tracksMap) => {
    const uniqueTracksById = playlists
      .flatMap((p) => p.trackIds)
      .reduce<{ [trackId: string]: Track }>(
        (tracksById, trackId) => ({ ...tracksById, [trackId]: tracksMap[trackId] }),
        {}
      );

    for (const trackId in uniqueTracksById) {
      uniqueTracksById[trackId] ||
        console.warn(`No corresponding track found for trackId: '${trackId}'`);
    }

    return Object.values(uniqueTracksById).filter((t) => !!t);
  }
);
