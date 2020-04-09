import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-state';

export const getPlaylistState = (state: RootState) => state.playlist;

export const getPlaylists = createSelector(getPlaylistState, (state) =>
  Object.values(state.playLists)
);
