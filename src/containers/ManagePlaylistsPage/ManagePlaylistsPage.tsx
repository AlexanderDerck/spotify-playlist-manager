import { Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { loadPlaylists } from '../../store/playlist/playlist.actions';

const { Text } = Typography;

export interface ManagePlaylistsPageProps extends DispatchProps {}

export interface DispatchProps {
  loadPlaylists: () => void;
}

export class ManagePlaylistsPage extends React.Component<ManagePlaylistsPageProps> {
  loadPlaylists: () => void;

  constructor(props: ManagePlaylistsPageProps) {
    super(props);
    this.loadPlaylists = props.loadPlaylists.bind(this);
  }

  componentDidMount() {
    this.loadPlaylists();
  }

  render() {
    return <Text>Authorized</Text>;
  }
}

const mapDispatch: DispatchProps = {
  loadPlaylists,
};
export default connect(null, mapDispatch)(ManagePlaylistsPage);
