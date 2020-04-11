import { Col, Row, Select, Space, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { TracksTable } from '../../components';
import { Playlist, Track } from '../../models';
import { changeSelectedPlaylistIds, loadPlaylists } from '../../store/actions';
import { RootState } from '../../store/root-state';
import {
    getPlaylistsMap, getSelectedPlaylists, getTracksForSelectedPlaylistIds
} from '../../store/selectors';
import { StringMap } from '../../store/utils';

const { Title } = Typography;
const { Option } = Select;

export interface TracksPageProps extends StateProps, DispatchProps {}

interface StateProps {
  playlistsMap: StringMap<Playlist>;
  selectedPlaylists: Playlist[];
  tracksForSelectedPlaylists: Track[];
}
interface DispatchProps {
  loadPlaylists(): void;
  changeSelectedPlaylistIds(playlistIds: string[]): void;
}

export class TracksPage extends React.Component<TracksPageProps> {
  loadPlaylists: () => void;
  changeSelectedPlaylistIds: (playlistIds: string[]) => void;

  constructor(props: TracksPageProps) {
    super(props);
    this.loadPlaylists = props.loadPlaylists.bind(this);
    this.changeSelectedPlaylistIds = props.changeSelectedPlaylistIds.bind(this);
  }

  componentDidMount() {
    this.loadPlaylists();
  }

  render() {
    const playlistOptions = Object.values(this.props.playlistsMap).map((playlist) => (
      <Option value={playlist.id} key={playlist.id}>
        {playlist.name}
      </Option>
    ));
    const filterOption = (inputValue: string, option: any) =>
      this.props.playlistsMap[option.key].name.toLowerCase().includes(inputValue.toLowerCase());

    return (
      <React.Fragment>
        <Title level={2}>Tracks</Title>
        <Space direction="vertical" size="large">
          <Row>
            <Col span={12}>
              <label>Selected playlists</label>
              <Select
                value={this.props.selectedPlaylists.map((p) => p.id)}
                onChange={(e) => this.changeSelectedPlaylistIds(e.toString().split(','))}
                filterOption={filterOption}
                placeholder="Select playlists to search in"
                mode="tags"
                size="large"
                className="mt-1 w-100"
              >
                {playlistOptions}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <TracksTable
                tracks={this.props.tracksForSelectedPlaylists}
                selectedPlaylists={this.props.selectedPlaylists}
              ></TracksTable>
            </Col>
          </Row>
        </Space>
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState): StateProps => ({
  playlistsMap: getPlaylistsMap(state),
  selectedPlaylists: getSelectedPlaylists(state),
  tracksForSelectedPlaylists: getTracksForSelectedPlaylistIds(state),
});
const mapDispatch: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  loadPlaylists: () => dispatch(loadPlaylists()),
  changeSelectedPlaylistIds: (selectedPlaylistIds: string[]) =>
    dispatch(changeSelectedPlaylistIds({ playlistIds: selectedPlaylistIds })),
});
export default connect(mapState, mapDispatch)(TracksPage);
