import { createAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
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
export const loadPlaylistTracks = createAction('[Playlists] Load playlist tracks', props<{ playlistId: string }>());
export const loadPlaylistTracksSuccess = createAction('[Playlists] Load playlist tracks success', props<{ playlistId: string; tracks: Track[] }>());
export const loadPlaylistTracksError = createErrorAction('[Playlists] Load playlist tracks error');

const actionCreatorMap = {
  loadPlaylists,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  loadPlaylistsAdditionalPages,
  loadPlaylistsAdditionalPagesSuccess,
  loadPlaylistsAdditionalPagesError,
  loadPlaylistTracks,
  loadPlaylistTracksSuccess,
  loadPlaylistTracksError,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
