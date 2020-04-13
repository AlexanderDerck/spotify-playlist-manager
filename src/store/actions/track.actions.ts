import { createAction } from '@reduxjs/toolkit';
import { Track } from '../../models';
import { actionTypes, props } from '../utils';

export const loadAllTracksForAllPlaylists = createAction('[Track] Load all tracks for all playlists');
export const loadAllTracksForAllPlaylistsCompleted = createAction('[Track] Load all tracks for all playlists completed');
export const loadAllTracksForPlaylist = createAction('[Track] Load all tracks for playlist', props<{ playlistId: string }>());
export const loadAllTracksForPlaylistCompleted = createAction('[Track] Load all tracks for playlist completed', props<{ playlistId: string }>());
export const loadPagedTracksForPlaylist = createAction('[Track] Load paged tracks for playlist', props<{ playlistId: string; page: number }>());
export const loadPagedTracksForPlaylistSuccess = createAction(
  '[Track] Load paged tracks for playlist success',
  props<{ playlistId: string; page: number; tracks: Track[] }>()
);
export const loadPagedTracksForPlaylistError = createAction(
  '[Track] Load paged tracks for playlist error',
  props<{ playlistId: string; page: number; error: string }>()
);

const actionCreatorMap = {
  loadAllTracksForAllPlaylists,
  loadAllTracksForAllPlaylistsCompleted,
  loadAllTracksForPlaylist,
  loadAllTracksForPlaylistCompleted,
  loadPagedTracksForPlaylist,
  loadPagedTracksForPlaylistSuccess,
  loadPagedTracksForPlaylistError,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
