import { createAction } from '@reduxjs/toolkit';
import {
    Duration, LoadTracksForPlaylistError, LoadTracksForPlaylistResult, LoadTracksForPlaylistTask,
    Track
} from '../../models';
import { actionTypes, props, StringMap } from '../utils';

export const retrieveTracksFromCache = createAction('[Track] Retrieve tracks from cache');
export const retrieveTracksFromCacheSuccess = createAction('[Track] Retrieve tracks from cache success', props<{ tracks: StringMap<Track> }>());
export const retrieveTracksFromCacheNotFound = createAction('[Track] Retrieve tracks from cache not found');
export const loadAllTracksForAllPlaylists = createAction('[Track] Load all tracks for all playlists');
export const loadAllTracksForAllPlaylistsCompleted = createAction(
  '[Track] Load all tracks for all playlists completed',
  props<{ elapsed: Duration }>()
);
export const loadAllTracksForPlaylist = createAction('[Track] Load all tracks for playlist', props<{ playlistId: string }>());
export const loadAllTracksForPlaylistCompleted = createAction(
  '[Track] Load all tracks for playlist completed',
  props<{ playlistId: string; tracks: Track[] }>()
);
export const queueLoadTracksForPlaylistTask = createAction('[Track] Queue LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTask = createAction('[Track] Run LoadTracksForPlaylistTask', props<LoadTracksForPlaylistTask>());
export const runLoadTracksForPlaylistTaskCompleted = createAction(
  '[Track] Run LoadTracksForPlaylistTask completed',
  props<LoadTracksForPlaylistResult>()
);
export const runLoadTracksForPlaylistTaskErrored = createAction('[Track] Run LoadTracksForPlaylistTask errored', props<LoadTracksForPlaylistError>());
export const reduceBatchOfLoadedTracksForPlaylists = createAction(
  '[Track] Reduce batch of loaded tracks for playlists',
  props<{ tracksByPlaylistId: StringMap<Track[]> }>()
);
export const searchSong = createAction('[Track] Search song', props<{ searchTerm: string }>());

const actionCreatorMap = {
  retrieveTracksFromCache,
  retrieveTracksFromCacheSuccess,
  retrieveTracksFromCacheNotFound,
  loadAllTracksForAllPlaylists,
  loadAllTracksForAllPlaylistsCompleted,
  loadAllTracksForPlaylist,
  loadAllTracksForPlaylistCompleted,
  queueLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTask,
  runLoadTracksForPlaylistTaskCompleted,
  runLoadTracksForPlaylistTaskErrored,
  reduceBatchOfLoadTracksForPlaylistResults: reduceBatchOfLoadedTracksForPlaylists,
  searchSong,
};
const all = actionTypes(actionCreatorMap);
export type TrackAction = typeof all;
