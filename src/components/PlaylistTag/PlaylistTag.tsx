import { Avatar, Col, Row, Typography } from 'antd';
import * as React from 'react';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Playlist } from '../../models';
import styles from './PlaylistTag.module.scss';

const { Text } = Typography;

export interface PlaylistTagProps {
  playlist: Playlist;
}

export const PlaylistTag: React.FunctionComponent<PlaylistTagProps> = ({ playlist }) => {
  const imageUrl = [...playlist.images].sort((a, b) => a.width - b.width).map((i) => i.url)[0];

  return (
    <span className="ant-tag py-1 px-2">
      <Row align="middle" gutter={8} className="flex-nowrap">
        <Col>{createAvatar(imageUrl)}</Col>
        <Col>
          <Text strong={true} ellipsis={true} className={styles.tagMaxWidth}>
            {playlist.name}
          </Text>
        </Col>
      </Row>
    </span>
  );
};

function createAvatar(imageUrl: string) {
  if (!imageUrl) {
    return <FontAwesomeIcon icon={faSpotify} size="lg" className={styles.spotifyIcon} />;
  }

  return <Avatar src={imageUrl} size="small"></Avatar>;
}
