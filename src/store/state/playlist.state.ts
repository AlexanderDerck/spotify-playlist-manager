import { Playlist } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
  playlistsTracksLoaded: StringMap<boolean>;
  selectedPlaylistIds: string[];
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
  playlistsTracksLoaded: {},
  selectedPlaylistIds: [],
};
