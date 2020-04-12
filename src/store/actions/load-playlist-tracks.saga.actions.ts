import { createAction } from '@reduxjs/toolkit';
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

const actionCreatorMap = {
  loadPlaylistTracksSagaStart,
  loadPlaylistTracksSagaCompleted,
  loadPlaylistTracksSagaErrored,
  loadAllTracksForPlaylist,
  loadAllTracksForPlaylistSuccess,
  loadAllTracksForPlaylistError,
};
const all = actionTypes(actionCreatorMap);
export type LoadPlaylistTracksSagaAction = typeof all;
