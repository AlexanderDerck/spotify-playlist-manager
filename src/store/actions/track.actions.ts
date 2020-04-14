import { createAction } from '@reduxjs/toolkit';
import {
    Duration, LoadTracksForPlaylistError, LoadTracksForPlaylistResult, LoadTracksForPlaylistTask,
    Track
} from '../../models';
import { actionTypes, props } from '../utils';

export const loadAllTracksForAllPlaylists = createAction('[Track] Load all tracks for all playlists');
export const loadAllTracksForAllPlaylistsCompleted = createAction(
  '[Track] Load all tracks for all playlists completed',
  props<{ elapsed: Duration }>()
);
export const loadAllTracksForPlaylist = createAction('[Track] Load all tracks for playlist', props<{ playlistId: string }>());
export const loadAllTracksForPlaylistCompleted = createAction('[Track] Load all tracks for playlist completed', props<{ playlistId: string }>());
export const queueLoadTracksForPlaylistTask = createAction('[Track] Queue LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTask = createAction('[Track] Run LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTaskCompleted = createAction(
  '[Track] Run LoadTracksForPlaylistTask completed',
  props<LoadTracksForPlaylistResult>()
);
export const runLoadTracksForPlaylistTaskErrored = createAction('[Track] Run LoadTracksForPlaylistTask errored', props<LoadTracksForPlaylistError>());
export const batchReduceLoadTracksForPlaylistTask = createAction('[Track] Batch reduce LoadTracksForPlaylistTask', props<{ tracks: Track[] }>());
export const searchSong = createAction('[Track] Search song', props<{ searchTerm: string }>());

const actionCreatorMap = {
  loadAllTracksForAllPlaylists,
  loadAllTracksForAllPlaylistsCompleted,
  loadAllTracksForPlaylist,
  loadAllTracksForPlaylistCompleted,
  queueLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTaskCompleted,
  runLoadTracksForPlaylistTaskErrored,
  batchReduceLoadTracksForPlaylistTask,
  searchSong,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
