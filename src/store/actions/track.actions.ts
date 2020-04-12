import { createAction } from '@reduxjs/toolkit';
import { LoadPagedTracksForPlaylistPayload, Track } from '../../models';
import { actionTypes, props } from '../utils';

export const loadPagedTracksForPlaylist = createAction('[Track] Load paged tracks for playlist', props<LoadPagedTracksForPlaylistPayload>());
export const loadPagedTracksForPlaylistSuccess = createAction(
  '[Track] Load paged tracks for playlist success',
  props<LoadPagedTracksForPlaylistPayload & { tracks: Track[] }>()
);
export const loadPagedTracksForPlaylistError = createAction(
  '[Track] Load paged tracks for playlist error',
  props<LoadPagedTracksForPlaylistPayload & { error: string }>()
);

const actionCreatorMap = {
  loadPagedTracksForPlaylist,
  loadPagedTracksForPlaylistSuccess,
  loadPagedTracksForPlaylistError,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
