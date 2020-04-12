import { createAction } from '@reduxjs/toolkit';
import { LoadPagedTracksForPlaylistPayload } from '../../models';
import { actionTypes, props } from '../utils';

export const queueLoadPagedTracksForPlaylist = createAction('[Task] Queue LoadPagedTracksForPlaylist', props<LoadPagedTracksForPlaylistPayload>());
export const startLoadPagedTracksForPlaylist = createAction('[Task] Start LoadPagedTracksForPlaylist', props<LoadPagedTracksForPlaylistPayload>());

const actionCreatorMap = {
  queueLoadPagedTracksForPlaylist,
  startLoadPagedTracksForPlaylist,
};
const all = actionTypes(actionCreatorMap);
export type TaskAction = typeof all;
