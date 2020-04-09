import { SpotifyImage } from './spotify-image';

export interface Playlist {
  id: string;
  name: string;
  ownerUserId: string;
  totalTracks: number;
  trackIds: string[];
  images: SpotifyImage[];
}
