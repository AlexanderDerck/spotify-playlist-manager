import { Col, Layout, Row } from 'antd';
import React from 'react';
import LoginPage from './features/user/containers/login-page/login-page';

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header>
        <img width="200px" src="/Spotify_Logo_RGB_Green.png" alt="logo" />
      </Header>
      <Content>
        <Row justify="center">
          <Col span={18}>
            <LoginPage></LoginPage>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
