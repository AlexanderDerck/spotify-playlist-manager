import { createAction } from '@reduxjs/toolkit';
import { Track } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const loadPlaylistTracks = createAction('[Track] Load playlist tracks', props<{ playlistId: string }>());
export const loadPlaylistTracksSuccess = createAction('[Track] Load playlist tracks success', props<{ playlistId: string; tracks: Track[] }>());
export const loadPlaylistTracksError = createErrorAction('[Track] Load playlist tracks error');
export const loadPlaylistTracksBecauseSelectedPlaylistsChanged = createAction('[Track] Load playlist tracks because selected playlists changed');

const actionCreatorMap = {
  loadPlaylistTracks,
  loadPlaylistTracksSuccess,
  loadPlaylistTracksError,
  loadPlaylistTracksBecauseSelectedPlaylistsChanged,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
