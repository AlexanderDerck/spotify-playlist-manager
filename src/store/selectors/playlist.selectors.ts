import { createSelector } from '@reduxjs/toolkit';
import { Playlist } from '../../models';
import { RootState } from '../root-state';

export const getPlaylistState = (state: RootState) => state.playlist;

export const getPlaylistsMap = createSelector(
  getPlaylistState,
  (state) => new Map(Object.entries(state.playLists))
);

export const getPlaylists = createSelector(getPlaylistsMap, (playlistsMap) => [
  ...playlistsMap.values(),
]);

export const getNumberOfPlaylistsWithTracksLoaded = createSelector(
  getPlaylistState,
  (state) => Object.values(state.playlistsTracksLoaded).filter((loaded) => loaded).length
);

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

export const getTrackIdsByPlaylistIdMap = createSelector(
  getPlaylistState,
  (state) => new Map(Object.entries(state.trackIdsByPlaylistId))
);
