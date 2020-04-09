import { Table, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import * as React from 'react';
import { Track } from '../../models';

const { Text } = Typography;

export interface TracksTableProps {
  tracks: Track[];
}

export const TracksTable: React.FunctionComponent<TracksTableProps> = ({ tracks }) => {
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

  return (
    <Table dataSource={tracks} tableLayout="fixed" size="middle">
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
    </Table>
  );
};

function getArtistNames(track: Track): string {
  return track.artists.map((a) => a.name).join(', ');
}
