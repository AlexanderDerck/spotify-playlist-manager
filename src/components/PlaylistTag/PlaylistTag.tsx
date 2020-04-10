import { Avatar, Col, Row, Typography } from 'antd';
import * as React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Playlist } from '../../models';

const { Text } = Typography;

export interface PlaylistTagProps {
  playlist: Playlist;
}

export const PlaylistTag: React.FunctionComponent<PlaylistTagProps> = ({ playlist }) => {
  const imageUrl = [...playlist.images].sort((a, b) => a.width - b.width).map((i) => i.url)[0];

  return (
    <span className="ant-tag py-1 px-2">
      <Row align="middle" gutter={8}>
        <Col>{createAvatar(imageUrl)}</Col>
        <Col>
          <Text strong={true}>{playlist.name}</Text>
        </Col>
      </Row>
    </span>
  );
};

function createAvatar(imageUrl: string) {
  if (!imageUrl) {
    return <Avatar icon={CaretRightOutlined}></Avatar>;
  }

  return <Avatar src={imageUrl} size="small"></Avatar>;
}
