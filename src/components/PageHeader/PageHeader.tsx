import { Col, Row, Typography } from 'antd';
import * as React from 'react';
import styles from './PageHeader.module.scss';

export interface PageHeaderProps {}

const { Title } = Typography;

export const PageHeader: React.FunctionComponent<PageHeaderProps> = () => (
  <Row align="middle">
    <Col>
      <img width="200px" src="/Spotify_Logo_RGB_Green.png" alt="logo" />
    </Col>
    <Col>
      <Title level={1} className={styles.title}>
        Playlist Manager
      </Title>
    </Col>
  </Row>
);
