import { Playlist } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
};
