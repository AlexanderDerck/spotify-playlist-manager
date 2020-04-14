import { StringMap } from '../store/utils';
import { Playlist } from './playlist';
import { Track } from './track';

export interface AppLocalStorage {
  playlists: StringMap<Playlist>;
  tracks: StringMap<Track>;
  trackIdsByPlaylistId: StringMap<string[]>;
}
