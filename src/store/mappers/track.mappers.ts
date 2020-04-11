import { parseJSON } from 'date-fns';
import { durationFromMilliseconds } from '../../functions';
import { Track } from '../../models';
import { PlaylistTrackObject } from '../../typings/spotify-api';
import { mapToAlbum, mapToArtist } from './playlist.mappers';

export function mapToTrack(trackResponse: PlaylistTrackObject): Track {
  return {
    id: trackResponse.track.uri,
    name: trackResponse.track.name,
    duration: durationFromMilliseconds(trackResponse.track.duration_ms),
    album: mapToAlbum(trackResponse.track.album),
    artists: trackResponse.track.artists.map(mapToArtist),
    isLocal: trackResponse.is_local,
    spotifyId: trackResponse.track.id,
    addedAt: parseJSON(trackResponse.added_at),
  };
}
