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
  const nameSorter = {
    compare: (a, b) => a.name.localeCompare(b.name),
    multiple: 1,
  };
  const artistSorter = {
    compare: (a, b) => getArtistNames(a).localeCompare(getArtistNames(b)),
    multiple: 1,
  };
  const artistRenderer = (text, track: Track) => <Text>{getArtistNames(track)}</Text>;
  const albumSorter = {
    compare: (a, b) => a.album.name.localeCompare(b.album.name),
    multiple: 1,
  };
  const durationSorter = {
    compare: (a, b) => millisecondsFromDuration(a.duration) - millisecondsFromDuration(b.duration),
    multiple: 1,
  };
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
        sorter={nameSorter}
        defaultSortOrder="ascend"
      ></Column>
      <Column title="Artist" key="artist" sorter={artistSorter} render={artistRenderer}></Column>
      <Column title="Album" dataIndex={['album', 'name']} key="album" sorter={albumSorter}></Column>
      <Column
        title="Duration"
        dataIndex="duration"
        key="duration"
        sorter={durationSorter}
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
