import { createSelector } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
import { RootState } from '../root-state';
import { getSelectedPlaylists, getTrackIdsByPlaylistIdMap } from './playlist.selectors';

export const getTrackState = (state: RootState) => state.track;

export const getTracksMap = createSelector(
  getTrackState,
  (state) => new Map(Object.entries(state.tracks))
);

export const getSearchTerm = createSelector(getTrackState, (state) =>
  state.searchTerm && state.searchTerm.length > 0 ? state.searchTerm : null
);

export const getFilteredTracksForTracksPage = createSelector(
  getTracksMap,
  getSelectedPlaylists,
  getSearchTerm,
  getTrackIdsByPlaylistIdMap,
  (tracksMap, selectedPlaylists, searchTerm, trackIdsByPlaylistIdMap) => {
    const filteredTracks = filterTracksForSelectedPlaylists(
      tracksMap,
      selectedPlaylists,
      trackIdsByPlaylistIdMap
    );

    return filterTracksForSearchTerm(filteredTracks, searchTerm);
  }
);

function filterTracksForSelectedPlaylists(
  tracksMap: Map<string, Track>,
  selectedPlaylists: Playlist[],
  trackIdsByPlaylistIdMap: Map<string, string[]>
): Track[] {
  // If no playlists selected, show all songs
  if (selectedPlaylists.length === 0) {
    return [...tracksMap.values()];
  }

  const uniqueTrackIdsForPlaylists = new Set(
    selectedPlaylists.flatMap((p) => trackIdsByPlaylistIdMap.get(p.id))
  );
  const uniqueTracks: Track[] = [];

  for (const trackId of uniqueTrackIdsForPlaylists) {
    const track = tracksMap.get(trackId);

    if (!track) {
      console.warn('No track found for track with Id: ' + trackId);
    } else {
      uniqueTracks.push(track);
    }
  }

  return uniqueTracks;
}

function filterTracksForSearchTerm(tracks: Track[], searchTerm: string) {
  if (searchTerm === null) {
    return tracks;
  }

  const searchTermLowerCase = searchTerm.replace(/\s/g, '').toLowerCase();

  return tracks.filter((t) =>
    buildTrackSearchString(t).toLowerCase().includes(searchTermLowerCase)
  );
}

function buildTrackSearchString(track: Track) {
  return (track.name + track.artists.flatMap((a) => a.name).join() + track.album.name)
    .replace(/\s/g, '')
    .toLowerCase();
}
