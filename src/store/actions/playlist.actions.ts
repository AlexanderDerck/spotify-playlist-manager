import { createAction } from '@reduxjs/toolkit';
import { Playlist } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const loadPlaylists = createAction('[Playlist] Load playlists');
export const loadPlaylistsSuccess = createAction('[Playlist] Load playlists success', props<{ playLists: Playlist[] }>());
export const loadPlaylistsError = createErrorAction('[Playlist] Load playlists error');
export const changeSelectedPlaylistIds = createAction('[Playlist] Change selectedPlaylistIds', props<{ playlistIds: string[] }>());

const actionCreatorMap = {
  loadPlaylists,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  changeSelectedPlaylistIds,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
