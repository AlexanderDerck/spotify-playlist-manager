import { Album, Artist, Playlist, SpotifyImage } from '../../models';
import {
    AlbumObjectSimplified, ArtistObjectSimplified, ImageObject, PlaylistObjectSimplified
} from '../../typings/spotify-api';

export function mapToPlaylist(playlistResponse: PlaylistObjectSimplified): Playlist {
  return {
    id: playlistResponse.id,
    name: playlistResponse.name,
    ownerUserId: playlistResponse.owner.id,
    totalTracks: playlistResponse.tracks.total,
    images: playlistResponse.images.map(mapToImage),
  };
}

export function mapToImage(image: ImageObject): SpotifyImage {
  return {
    url: image.url,
    height: image.height,
    width: image.width,
  };
}

export function mapToAlbum(album: AlbumObjectSimplified): Album {
  return {
    id: album.id,
    name: album.name,
    images: album.images.map(mapToImage),
  };
}

export function mapToArtist(artist: ArtistObjectSimplified): Artist {
  return {
    id: artist.id,
    name: artist.name,
  };
}
