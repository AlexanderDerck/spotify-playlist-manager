import { Playlist, SpotifyImage } from '../../models';
import { PlaylistObjectSimplified } from '../../typings/spotify-api';

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
  };
}
