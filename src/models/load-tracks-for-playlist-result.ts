import { Track } from './track';

export interface LoadTracksForPlaylistResult {
  playlistId: string;
  page: number;
  tracks: Track[];
}
