import { createSelector } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
import { RootState } from '../root-state';

export const getPlaylistState = (state: RootState) => state.playlist;

export const getPlaylistsMap = createSelector(getPlaylistState, (state) => state.playLists);

export const getSelectedPlaylistIds = createSelector(
  getPlaylistState,
  (state) => state.selectedPlaylistIds
);

export const getSelectedPlaylists = createSelector(
  getPlaylistState,
  getSelectedPlaylistIds,
  (state, playlistIds) =>
    playlistIds
      .reduce<Playlist[]>(
        (playlists, playlistId) => [...playlists, state.playLists[playlistId]],
        []
      )
      .filter((playlist) => playlist !== undefined)
);

export const getSelectedPlaylistIdsWithoutTracksLoaded = createSelector(
  getSelectedPlaylists,
  (selectedPlaylists) => selectedPlaylists.filter((p) => p.trackIds === null).map((p) => p.id)
);

export const getTracks = createSelector(getPlaylistState, (state) => state.tracks);

export const getTracksForSelectedPlaylistIds = createSelector(
  getSelectedPlaylists,
  getTracks,
  (playlists, tracks) => {
    const uniqueTracksById = playlists
      .flatMap((p) => p.trackIds || [])
      .reduce<{ [trackId: string]: Track }>(
        (tracksById, trackId) => ({ ...tracksById, [trackId]: tracks[trackId] }),
        {}
      );

    for (const trackId in uniqueTracksById) {
      uniqueTracksById[trackId] ||
        console.warn(`No corresponding track found for trackId: '${trackId}'`);
    }

    return Object.values(uniqueTracksById).filter((t) => !!t);
  }
);
