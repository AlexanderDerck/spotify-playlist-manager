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
export const loadPlaylistTracks = createAction('[Playlist] Load playlist tracks', props<{ playlistId: string }>());
export const loadPlaylistTracksSuccess = createAction('[Playlist] Load playlist tracks success', props<{ playlistId: string; tracks: Track[] }>());
export const loadPlaylistTracksError = createErrorAction('[Playlist] Load playlist tracks error');
export const loadPlaylistTracksBecausePlaylistsLoaded = createAction(
  '[Playlist] Load playlist tracks because playlists loaded',
  props<{ playlistIds: string[] }>()
);
export const loadPlaylistTracksBecausePlaylistsLoadedSuccess = createAction(
  '[Playlist] Load playlist tracks because playlists loaded success',
  props<{ tracksByPlaylistId: [string, Track[]][] }>()
);
export const loadPlaylistTracksBecausePlaylistsLoadedError = createErrorAction('[Playlist] Load playlist tracks because playlists loaded error');

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
  loadPlaylistTracksBecausePlaylistsLoaded,
  loadPlaylistTracksBecausePlaylistsLoadedSuccess,
  loadPlaylistTracksBecausePlaylistsLoadedError,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
