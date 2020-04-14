import { Table, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import * as React from 'react';
import { Playlist, Track } from '../../models';
import { PlaylistTags } from '../PlaylistTags/PlaylistTags';

const { Text } = Typography;

export interface TracksTableProps {
  tracks: Track[];
  playlists: Playlist[];
}

export const TracksTable: React.FunctionComponent<TracksTableProps> = ({ tracks, playlists }) => {
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
  const playlistRenderer = (_, track: Track) => renderPlaylistTagsForTrack(track, playlists);

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
        filterMultiple={false}
        sorter={nameSorter}
        defaultSortOrder="ascend"
      ></Column>
      <Column
        title="Artist"
        key="artist"
        filterMultiple={false}
        sorter={artistSorter}
        render={artistRenderer}
      ></Column>
      <Column
        title="Album"
        dataIndex={['album', 'name']}
        key="album"
        filterMultiple={false}
        sorter={albumSorter}
      ></Column>
      <Column key="playlists" render={playlistRenderer}></Column>
    </Table>
  );
};

function getArtistNames(track: Track): string {
  return track.artists.map((a) => a.name).join(', ');
}

function renderPlaylistTagsForTrack(track: Track, playlists: Playlist[]): React.ReactElement {
  const playlistsForTrack = playlists.filter((p) => p.trackIds.includes(track.id));

  return <PlaylistTags playlists={playlistsForTrack}></PlaylistTags>;
}
