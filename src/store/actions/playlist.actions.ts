import { createAction } from '@reduxjs/toolkit';
import { Playlist } from '../../models';
import { actionTypes, createErrorAction, props, StringMap } from '../utils';

export const loadPlaylists = createAction('[Playlist] Load playlists');
export const loadPlaylistsSuccess = createAction('[Playlist] Load playlists success', props<{ playlists: Playlist[] }>());
export const loadPlaylistsError = createErrorAction('[Playlist] Load playlists error');
export const linkTracksToPlaylistsFromCache = createAction('[Playlist] Link tracks to playlists from cache');
export const linkTracksToPlaylistsFromCacheSuccess = createAction(
  '[Playlist] Link tracks to playlists from cache success',
  props<{ trackIdsByPlaylistId: StringMap<string[]> }>()
);
export const linkTracksToPlaylistsFromCacheNotFound = createAction('[Playlist] Link tracks to playlists from cache not found');
export const changeSelectedPlaylistIds = createAction('[Playlist] Change selectedPlaylistIds', props<{ playlistIds: string[] }>());

const actionCreatorMap = {
  loadPlaylists,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  linkTracksToPlaylistsFromCache,
  linkTracksToPlaylistsFromCacheSuccess,
  linkTracksToPlaylistsFromCacheNotFound,
  changeSelectedPlaylistIds,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
