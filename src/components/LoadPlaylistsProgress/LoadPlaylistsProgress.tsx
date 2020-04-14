import { Card, Progress, Typography } from 'antd';
import * as React from 'react';
import styles from './LoadPlaylistsProgress.module.scss';

const { Text } = Typography;

export interface LoadPlaylistsProgressProps {
  loadedPlaylists: number;
  totalPlaylists: number;
}

export const LoadPlaylistsProgress: React.FunctionComponent<LoadPlaylistsProgressProps> = ({
  loadedPlaylists,
  totalPlaylists,
}) => {
  const formatProgress = () => `${loadedPlaylists} / ${totalPlaylists}`;
  const percent = Math.ceil((loadedPlaylists / totalPlaylists) * 100);

  return (
    <Card className={styles.fixedCard}>
      <Text>Loading playlists...</Text>
      <Progress percent={percent} format={formatProgress}></Progress>
    </Card>
  );
};
