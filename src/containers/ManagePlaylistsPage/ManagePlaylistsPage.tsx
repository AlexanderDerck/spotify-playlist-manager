import { Col, Row, Select, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../models';
import {
    getPlaylists, getSelectedPlaylistIds, getTracksForSelectedPlaylistIds
} from '../../store/playlist';
import { changeSelectedPlaylistIds, loadPlaylists } from '../../store/playlist/playlist.actions';
import { RootState } from '../../store/root-state';

const { Text } = Typography;
const { Option } = Select;

export interface ManagePlaylistsPageProps extends StateProps, DispatchProps {}

interface StateProps {
  playlists: Playlist[];
  selectedPlaylistIds: string[];
  tracksForSelectedPlaylist: Track[];
}
interface DispatchProps {
  loadPlaylists(): void;
  changeSelectedPlaylistIds(playlistIds: string[]): void;
}

export class ManagePlaylistsPage extends React.Component<ManagePlaylistsPageProps> {
  loadPlaylists: () => void;
  changeSelectedPlaylistIds: (playlistIds: string[]) => void;

  constructor(props: ManagePlaylistsPageProps) {
    super(props);
    this.loadPlaylists = props.loadPlaylists.bind(this);
    this.changeSelectedPlaylistIds = props.changeSelectedPlaylistIds.bind(this);
  }

  componentDidMount() {
    this.loadPlaylists();
  }

  render() {
    const playlistOptions = this.props.playlists.map((playlist) => (
      <Option value={playlist.id} key={playlist.id}>
        {playlist.name}
      </Option>
    ));

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Text>Authorized</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Select
              value={this.props.selectedPlaylistIds}
              onChange={(e) => this.changeSelectedPlaylistIds(e.toString().split(','))}
              placeholder="Select playlists to search in"
              mode="tags"
              size="large"
              style={{ width: '100%' }}
            >
              {playlistOptions}
            </Select>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState): StateProps => ({
  playlists: getPlaylists(state),
  selectedPlaylistIds: getSelectedPlaylistIds(state),
  tracksForSelectedPlaylist: getTracksForSelectedPlaylistIds(state),
});
const mapDispatch: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  loadPlaylists: () => dispatch(loadPlaylists()),
  changeSelectedPlaylistIds: (selectedPlaylistIds: string[]) =>
    dispatch(changeSelectedPlaylistIds({ playlistIds: selectedPlaylistIds })),
});
export default connect(mapState, mapDispatch)(ManagePlaylistsPage);
