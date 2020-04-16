import { Card, Progress, Typography } from 'antd';
import * as React from 'react';
import styles from './LoadPlaylistsProgress.module.scss';

const { Text } = Typography;

export interface LoadPlaylistsProgressProps {
  /**
   * Optional number to indicate delay on hiding progress bar
   */
  delay?: number;
  showProgress: boolean;
  loadedPlaylists: number;
  totalPlaylists: number;
}

interface LoadPlaylistsProgressState {
  showProgress: boolean;
}

export class LoadPlaylistsProgress extends React.Component<
  LoadPlaylistsProgressProps,
  LoadPlaylistsProgressState
> {
  constructor(props) {
    super(props);
    this.state = { showProgress: false };
  }

  showProgress(): void {
    if (!this.state.showProgress) {
      this.setState({ showProgress: true });
    }
  }

  hideProgress(): void {
    if (!this.state.showProgress) {
      return;
    }

    if (this.props.delay) {
      setTimeout(() => this.setState({ showProgress: false }), this.props.delay);
    } else {
      this.setState({ showProgress: false });
    }
  }

  render() {
    this.props.showProgress ? this.showProgress() : this.hideProgress();

    if (!this.state.showProgress) {
      return null;
    }

    const formatProgress = () => `${this.props.loadedPlaylists} / ${this.props.totalPlaylists}`;
    const percent = Math.ceil((this.props.loadedPlaylists / this.props.totalPlaylists) * 100);

    return (
      <Card className={styles.fixedCard}>
        <Text>Loading playlists...</Text>
        <Progress percent={percent} format={formatProgress}></Progress>
      </Card>
    );
  }
}
