import { Col, Row, Select, Space, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { TracksTable } from '../../components';
import { Playlist, Track } from '../../models';
import { changeSelectedPlaylistIds, loadPlaylists } from '../../store/actions';
import { RootState } from '../../store/root-state';
import {
    getFilteredTracksForSelectedPlaylistIds, getPlaylistsMap, getSelectedPlaylists
} from '../../store/selectors';

const { Title } = Typography;
const { Option } = Select;

export interface TracksPageProps extends StateProps, DispatchProps {}

interface StateProps {
  playlistsMap: Map<string, Playlist>;
  selectedPlaylists: Playlist[];
  tracks: Track[];
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
    const playlists = [...this.props.playlistsMap.values()];
    const playlistOptions = playlists.map((playlist) => (
      <Option value={playlist.id} key={playlist.id}>
        {playlist.name}
      </Option>
    ));
    const filterOption = (inputValue: string, option: any) =>
      this.props.playlistsMap.get(option.key).name.toLowerCase().includes(inputValue.toLowerCase());

    return (
      <React.Fragment>
        <Title level={2}>Tracks</Title>
        <Space direction="vertical" size="large">
          <Row>
            <Col span={12}>
              <label>Selected playlists</label>
              <Select
                value={this.props.selectedPlaylists.map((p) => p.id)}
                onChange={(e) => this.changeSelectedPlaylistIds(e.filter((id) => !!id))}
                filterOption={filterOption}
                placeholder="Filter on playlists"
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
                tracks={this.props.tracks}
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
  tracks: getFilteredTracksForSelectedPlaylistIds(state),
});
const mapDispatch: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  loadPlaylists: () => dispatch(loadPlaylists()),
  changeSelectedPlaylistIds: (selectedPlaylistIds: string[]) =>
    dispatch(changeSelectedPlaylistIds({ playlistIds: selectedPlaylistIds })),
});
export default connect(mapState, mapDispatch)(TracksPage);
