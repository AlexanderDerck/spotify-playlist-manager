import { createSelector } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
import { RootState } from '../root-state';
import { getSelectedPlaylists } from './playlist.selectors';

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
  (tracksMap, selectedPlaylists, searchTerm) => {
    const filteredTracks = filterTracksForSelectedPlaylists(tracksMap, selectedPlaylists);

    return filterTracksForSearchTerm(filteredTracks, searchTerm);
  }
);

function filterTracksForSelectedPlaylists(
  tracksMap: Map<string, Track>,
  selectedPlaylists: Playlist[]
): Track[] {
  // If no playlists selected, show all songs
  if (selectedPlaylists.length === 0) {
    return [...tracksMap.values()];
  }

  return [...new Set(selectedPlaylists.flatMap((p) => p.trackIds))].map((trackId) =>
    tracksMap.get(trackId)
  );
}
function filterTracksForSearchTerm(tracks: Track[], searchTerm: string) {
  if (searchTerm === null) {
    return tracks;
  }

  const searchTermLowerCase = searchTerm.toLowerCase();

  return tracks.filter((t) =>
    buildTrackSearchString(t).toLowerCase().includes(searchTermLowerCase)
  );
}

function buildTrackSearchString(track: Track) {
  return track.name + track.artists.flatMap((a) => a.name).join() + track.album.name;
}
