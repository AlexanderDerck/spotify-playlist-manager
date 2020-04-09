import { createAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const loadPlaylists = createAction('[Playlist] Load playlists');
export const loadPlaylistsSuccess = createAction('[Playlist] Load playlists success', props<{ playLists: Playlist[] }>());
export const loadPlaylistsError = createErrorAction('[Playlist] Load playlists error');
export const loadPlaylistTracks = createAction('[Playlist] Load playlist tracks', props<{ playlistId: string }>());
export const loadPlaylistTracksSuccess = createAction('[Playlist] Load playlist tracks success', props<{ playlistId: string; tracks: Track[] }>());
export const loadPlaylistTracksError = createErrorAction('[Playlist] Load playlist tracks error');
export const changeSelectedPlaylistIds = createAction('[Playlist] Change selectedPlaylistIds', props<{ playlistIds: string[] }>());
export const loadPlaylistTracksBecauseSelectedPlaylistsChanged = createAction('[Playlist] Load playlist tracks because selected playlists changed');

const actionCreatorMap = {
  loadPlaylists,
  loadPlaylistsSuccess,
  loadPlaylistsError,
  loadPlaylistTracks,
  loadPlaylistTracksSuccess,
  loadPlaylistTracksError,
  changeSelectedPlaylistIds,
  loadPlaylistTracksBecauseSelectedPlaylistsChanged,
};
const all = actionTypes(actionCreatorMap);
export type PlaylistAction = typeof all;
