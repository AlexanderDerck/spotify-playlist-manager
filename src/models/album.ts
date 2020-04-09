import { SpotifyImage } from './spotify-image';

export interface Album {
  id: string;
  name: string;
  images: SpotifyImage[];
}
