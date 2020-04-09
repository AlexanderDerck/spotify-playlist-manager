import { Playlist, Track } from '../../models';
import { StringMap } from '../utils';

export interface PlaylistState {
  playLists: StringMap<Playlist>;
  tracks: StringMap<Track>;
}

export const initialPlaylistState: PlaylistState = {
  playLists: {},
  tracks: {},
};
