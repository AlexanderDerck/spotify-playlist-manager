import { createAction } from '@reduxjs/toolkit';
import { LoadPagedTracksForPlaylistTask, Track } from '../../models';
import { actionTypes, props } from '../utils';

export const loadPagedTracksForPlaylist = createAction('[Track] Load paged tracks for playlist', props<LoadPagedTracksForPlaylistTask>());
export const queueLoadPagedTracksForPlaylistTask = createAction(
  '[Track] Queue LoadPagedTracksForPlaylistTask',
  props<LoadPagedTracksForPlaylistTask>()
);
export const runLoadPagedTracksForPlaylistTask = createAction('[Track] Run LoadPagedTracksForPlaylistTask', props<LoadPagedTracksForPlaylistTask>());
export const runLoadPagedTracksForPlaylistTaskCompleted = createAction(
  '[Track] Run LoadPagedTracksForPlaylistTask completed',
  props<LoadPagedTracksForPlaylistTask & { tracks: Track[] }>()
);
export const runLoadPagedTracksForPlaylistTaskErrored = createAction(
  '[Track] Run LoadPagedTracksForPlaylistTask errored',
  props<LoadPagedTracksForPlaylistTask & { error: string }>()
);

const actionCreatorMap = {
  loadPagedTracksForPlaylist,
  queueLoadPagedTracksForPlaylistTask,
  runLoadPagedTracksForPlaylistTask,
  runLoadPagedTracksForPlaylistTaskCompleted,
  runLoadPagedTracksForPlaylistTaskErrored,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
