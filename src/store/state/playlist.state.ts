import { Playlist, Track } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
  tracks: StringMap<Track>;
  selectedPlaylistIds: string[];
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
  tracks: {},
  selectedPlaylistIds: [],
};
