import { createAction } from '@reduxjs/toolkit';
import { Track } from '../../models';
import { actionTypes, createErrorAction, props } from '../utils';

export const loadPlaylistTracksSagaStart = createAction('[LoadPlaylistTracksSaga] Load playlist tracks saga start');
export const loadPlaylistTracksSagaCompleted = createAction('[LoadPlaylistTracksSaga] Load playlist tracks saga completed');
export const loadPlaylistTracksSagaErrored = createErrorAction('[LoadPlaylistTracksSaga] Load playlist tracks saga errored');
export const loadAllTracksForPlaylist = createAction('[LoadPlaylistTracksSaga] Load all tracks for playlist', props<{ playlistId: string }>());
export const loadAllTracksForPlaylistSuccess = createAction(
  '[LoadPlaylistTracksSaga] Load all tracks for playlist success',
  props<{ playlistId: string }>()
);
export const loadAllTracksForPlaylistError = createAction(
  '[LoadPlaylistTracksSaga] Load all tracks for playlist error',
  props<{ playlistId: string; error: any }>()
);
export const scheduleLoadPagedTracksForPlaylistAction = createAction(
  '[LoadPlaylistTracksSaga] Schedule loadPagedTracksForPlaylistAction',
  props<{ playlistId: string; page: number }>()
);
export const loadPagedTracksForPlaylist = createAction(
  '[LoadPlaylistTracksSaga] Load paged tracks for playlist',
  props<{ playlistId: string; page: number }>()
);
export const loadPagedTracksForPlaylistSuccess = createAction(
  '[LoadPlaylistTracksSaga] Load paged tracks for playlist success',
  props<{ playlistId: string; page: number; tracks: Track[] }>()
);
export const loadPagedTracksForPlaylistError = createAction(
  '[LoadPlaylistTracksSaga] Load paged tracks for playlist error',
  props<{ playlistId: string; page: number; error: string }>()
);

const actionCreatorMap = {
  loadPlaylistTracksSagaStart,
  loadPlaylistTracksSagaCompleted,
  loadPlaylistTracksSagaErrored,
  loadAllTracksForPlaylist,
  loadAllTracksForPlaylistSuccess,
  loadAllTracksForPlaylistError,
  scheduleLoadPagedTracksForPlaylistAction,
  loadPagedTracksForPlaylist,
  loadPagedTracksForPlaylistSuccess,
  loadPagedTracksForPlaylistError,
};
const all = actionTypes(actionCreatorMap);
export type LoadPlaylistTracksSagaAction = typeof all;
