import { Track } from '../models';
import { generateHash } from './generate-hash';

export function calculateTrackIdentifier(track: Track) {
  if (track.id !== null) {
    return track.id;
  }

  return generateHash(track.name + track.album.name + track.artists.map((a) => a.name).join());
}
