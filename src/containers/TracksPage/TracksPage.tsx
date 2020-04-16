import { Col, Input, Row, Select, Space, Typography } from 'antd';
import { debounce } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { LoadPlaylistsProgress, TracksTable } from '../../components';
import { Playlist, Track } from '../../models';
import { changeSelectedPlaylistIds, loadPlaylists, searchSong } from '../../store/actions';
import { RootState } from '../../store/root-state';
import {
    getArePlaylistsLoading, getFilteredTracksForTracksPage, getNumberOfPlaylistsWithTracksLoaded,
    getPlaylistsMap, getSelectedPlaylists, getTrackIdsByPlaylistIdMap
} from '../../store/selectors';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

export interface TracksPageProps extends StateProps, DispatchProps {}

interface StateProps {
  playlistsMap: Map<string, Playlist>;
  selectedPlaylists: Playlist[];
  tracks: Track[];
  trackIdsByPlaylistIdMap: Map<string, string[]>;
  arePlaylistsLoading: boolean;
  numberOfPlaylistsWithTracksLoaded: number;
}
interface DispatchProps {
  loadPlaylists(): void;
  changeSelectedPlaylistIds(playlistIds: string[]): void;
  search(searchTerm: string): void;
}

export class TracksPage extends React.Component<TracksPageProps> {
  loadPlaylists: () => void;
  changeSelectedPlaylistIds: (playlistIds: string[]) => void;
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;

  constructor(props: TracksPageProps) {
    super(props);
    this.loadPlaylists = props.loadPlaylists.bind(this);
    this.changeSelectedPlaylistIds = props.changeSelectedPlaylistIds.bind(this);

    const debouncedSearch = debounce(this.props.search, 300);
    this.search = (e) => debouncedSearch(e.target.value);
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
        {this.props.arePlaylistsLoading && (
          <LoadPlaylistsProgress
            loadedPlaylists={this.props.numberOfPlaylistsWithTracksLoaded}
            totalPlaylists={playlists.length}
          ></LoadPlaylistsProgress>
        )}

        <Title level={2}>Tracks</Title>
        <Space direction="vertical">
          <Row>
            <Col span={12}>
              <label>Playlists</label>
              <Select
                value={this.props.selectedPlaylists.map((p) => p.id)}
                onChange={(e) => this.changeSelectedPlaylistIds(e.filter((id) => !!id))}
                filterOption={filterOption}
                placeholder="Filter songs for playlists"
                mode="tags"
                size="large"
                className="mt-1 w-100"
              >
                {playlistOptions}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <label>Songs</label>
              <Search onChange={(e) => this.search(e)} placeholder="Search songs" size="large" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TracksTable
                tracks={this.props.tracks}
                playlists={playlists}
                trackIdsByPlaylistIdMap={this.props.trackIdsByPlaylistIdMap}
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
  tracks: getFilteredTracksForTracksPage(state),
  trackIdsByPlaylistIdMap: getTrackIdsByPlaylistIdMap(state),
  arePlaylistsLoading: getArePlaylistsLoading(state),
  numberOfPlaylistsWithTracksLoaded: getNumberOfPlaylistsWithTracksLoaded(state),
});
const mapDispatch: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  loadPlaylists: () => dispatch(loadPlaylists()),
  changeSelectedPlaylistIds: (selectedPlaylistIds: string[]) =>
    dispatch(changeSelectedPlaylistIds({ playlistIds: selectedPlaylistIds })),
  search: (searchTerm: string) => dispatch(searchSong({ searchTerm })),
});
export default connect(mapState, mapDispatch)(TracksPage);
