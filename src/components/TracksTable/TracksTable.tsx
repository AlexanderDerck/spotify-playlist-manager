import { Table, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import * as React from 'react';
import { Duration, Playlist, Track } from '../../models';
import { millisecondsFromDuration } from '../../utils';
import { PlaylistTags } from '../PlaylistTags/PlaylistTags';

const { Text } = Typography;

export interface TracksTableProps {
  tracks: Track[];
  playlists: Playlist[];
  trackIdsByPlaylistIdMap: Map<string, string[]>;
}

export const TracksTable: React.FunctionComponent<TracksTableProps> = ({
  tracks,
  playlists,
  trackIdsByPlaylistIdMap,
}) => {
  const artistRenderer = (_, track: Track) => <Text>{getArtistNames(track)}</Text>;
  const playlistRenderer = (_, track: Track) =>
    renderPlaylistTagsForTrack(track, playlists, trackIdsByPlaylistIdMap);

  return (
    <Table
      dataSource={tracks}
      tableLayout="fixed"
      size="small"
      rowKey={(t) => t.id}
      pagination={{ position: ['topRight', 'bottomRight'] as any }}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a: Track, b: Track) => a.name.localeCompare(b.name)}
        defaultSortOrder="ascend"
      ></Column>
      <Column
        title="Artist"
        key="artist"
        sorter={(a: Track, b: Track) => getArtistNames(a).localeCompare(getArtistNames(b))}
        render={artistRenderer}
      ></Column>
      <Column
        title="Album"
        dataIndex={['album', 'name']}
        key="album"
        sorter={(a: Track, b: Track) => a.album.name.localeCompare(b.album.name)}
      ></Column>
      <Column
        title="Duration"
        dataIndex="duration"
        key="duration"
        sorter={(a: Track, b: Track) =>
          millisecondsFromDuration(a.duration) - millisecondsFromDuration(b.duration)
        }
        render={renderDuration}
      ></Column>
      <Column key="playlists" render={playlistRenderer}></Column>
    </Table>
  );
};

function getArtistNames(track: Track): string {
  return track.artists.map((a) => a.name).join(', ');
}

function renderDuration(duration: Duration): string {
  if (duration.hours) {
    return `${duration.hours}:${duration.minutes
      .toString()
      .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`;
  }

  return `${duration.minutes}:${duration.seconds.toString().padStart(2, '0')}`;
}

function renderPlaylistTagsForTrack(
  track: Track,
  playlists: Playlist[],
  trackIdsByPlaylistIdMap: Map<string, string[]>
): React.ReactElement {
  const playlistsForTrack = playlists.filter((playlist) => {
    const trackIdsForPlaylist = trackIdsByPlaylistIdMap.get(playlist.id);

    return trackIdsForPlaylist && trackIdsForPlaylist.includes(track.id);
  });

  return <PlaylistTags playlists={playlistsForTrack}></PlaylistTags>;
}
