import { Playlist } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
  selectedPlaylistIds: string[];
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
  selectedPlaylistIds: [],
};
