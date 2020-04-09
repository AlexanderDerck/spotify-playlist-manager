import { createAction } from '@reduxjs/toolkit';
import { Playlist } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const loadPlaylists = createAction('[Playlist] Load playlists');
export const loadPlaylistsSuccess = createAction('[Playlist] Load playlists success', props<{ playLists: Playlist[] }>());
export const loadPlaylistsError = createErrorAction('[Playlist] Load playlists error');
export const loadPlaylistsAdditionalPages = createAction('[Playlist] Load playlists additional pages', props<{ offset: number }>());
export const loadPlaylistsAdditionalPagesSuccess = createAction(
  '[Playlist] Load playlists additional pages success',
  props<{ playLists: Playlist[] }>()
);
export const loadPlaylistsAdditionalPagesError = createErrorAction('[Playlist] Load playlists additional pages error');

const actionCreatorMap = {
  loadPlaylists,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  loadPlaylistsAdditionalPages,
  loadPlaylistsAdditionalPagesSuccess,
  loadPlaylistsAdditionalPagesError,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
