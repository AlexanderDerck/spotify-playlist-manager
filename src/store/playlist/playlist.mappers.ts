import { Playlist, SpotifyImage, Track } from '../../models';
import { PlaylistObjectSimplified, PlaylistTrackObject } from '../../typings/spotify-api';

export function mapToPlaylist(playlistResponse: PlaylistObjectSimplified): Playlist {
  return {
    id: playlistResponse.id,
    name: playlistResponse.name,
    ownerUserId: playlistResponse.owner.id,
    totalTracks: playlistResponse.tracks.total,
    coverImages: playlistResponse.images.map<SpotifyImage>((image) => ({
      url: image.url,
      height: image.height,
      width: image.width,
    })),
    trackIds: null,
  };
}

export function mapToTrack(trackResponse: PlaylistTrackObject): Track {
  return {
    id: trackResponse.track.id,
    name: trackResponse.track.name,
    album: {
      id: trackResponse.track.album.id,
      name: trackResponse.track.album.name,
    },
    artists: trackResponse.track.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
  };
}
