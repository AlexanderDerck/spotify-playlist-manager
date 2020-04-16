import { Playlist } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
  playlistsTracksLoaded: StringMap<boolean>;
  selectedPlaylistIds: string[];
  trackIdsByPlaylistId: StringMap<string[]>;
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
  playlistsTracksLoaded: null,
  selectedPlaylistIds: [],
  trackIdsByPlaylistId: {},
};
