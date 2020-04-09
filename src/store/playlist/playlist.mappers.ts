import { Album, Artist, Playlist, SpotifyImage, Track } from '../../models';
import {
    AlbumObjectSimplified, ArtistObjectSimplified, ImageObject, PlaylistObjectSimplified,
    PlaylistTrackObject
} from '../../typings/spotify-api';

export function mapToPlaylist(playlistResponse: PlaylistObjectSimplified): Playlist {
  return {
    id: playlistResponse.id,
    name: playlistResponse.name,
    ownerUserId: playlistResponse.owner.id,
    totalTracks: playlistResponse.tracks.total,
    images: playlistResponse.images.map(mapToImage),
    trackIds: null,
  };
}

export function mapToTrack(trackResponse: PlaylistTrackObject): Track {
  return {
    id: trackResponse.track.id,
    name: trackResponse.track.name,
    album: mapToAlbum(trackResponse.track.album),
    artists: trackResponse.track.artists.map(mapToArtist),
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
