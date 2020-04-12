import { createAction } from '@reduxjs/toolkit';
import { LoadTracksForPlaylistTask, Track } from '../../models';
import { actionTypes, props } from '../utils';

export const loadTracksForPlaylist = createAction('[Track] Load tracks for playlist', props<LoadTracksForPlaylistTask>());
export const queueLoadTracksForPlaylistTask = createAction('[Track] Queue LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTask = createAction('[Track] Run LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTaskCompleted = createAction(
  '[Track] Run LoadTracksForPlaylistTask completed',
  props<LoadTracksForPlaylistTask & { tracks: Track[] }>()
);
export const runLoadTracksForPlaylistTaskErrored = createAction(
  '[Track] Run LoadTracksForPlaylistTask errored',
  props<LoadTracksForPlaylistTask & { error: string }>()
);

const actionCreatorMap = {
  loadTracksForPlaylist,
  queueLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTaskCompleted,
  runLoadTracksForPlaylistTaskErrored,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
