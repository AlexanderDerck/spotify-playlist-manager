import { Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadPlaylists, loadPlaylistTracks } from '../../store/playlist/playlist.actions';

const { Text } = Typography;

export interface ManagePlaylistsPageProps extends DispatchProps {}

export interface DispatchProps {
  loadPlaylists: () => void;
  loadPlaylistTracks: ({ playlistId: string }) => void;
}

export class ManagePlaylistsPage extends React.Component<ManagePlaylistsPageProps> {
  loadPlaylists: () => void;
  loadPlaylistTracks: ({ playlistId: string }) => void;

  constructor(props: ManagePlaylistsPageProps) {
    super(props);
    this.loadPlaylists = props.loadPlaylists.bind(this);
    this.loadPlaylistTracks = props.loadPlaylistTracks.bind(this);
  }

  componentDidMount() {
    this.loadPlaylists();
    this.loadPlaylistTracks({ playlistId: '3WGhwW6dixRn4IPmPhPMHi' });
  }

  render() {
    return <Text>Authorized</Text>;
  }
}

const mapDispatch: DispatchProps = {
  loadPlaylists,
  loadPlaylistTracks,
};
export default connect(null, mapDispatch)(ManagePlaylistsPage);
