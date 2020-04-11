import { Album } from './album';
import { Artist } from './artist';
import { Duration } from './duration';

export interface Track {
  id: string;
  name: string;
  duration: Duration;
  album: Album;
  artists: Artist[];
  isLocal: boolean;
  spotifyId: string;
  addedAt: Date;
}
