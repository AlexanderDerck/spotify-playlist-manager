import { Col, Layout, Row, Typography } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { AuthenticationPage, PrivateRoute } from './containers';

const { Header, Content } = Layout;
const { Text, Title } = Typography;

export default function App() {
  return (
    <Router>
      <Layout>
        <Header>
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
        </Header>
        <Content>
          <Row justify="center">
            <Col span={18}>
              <Switch>
                <PrivateRoute exact path="/">
                  <Text>Authenticated</Text>
                </PrivateRoute>
                <Route path="/authenticate">
                  <AuthenticationPage></AuthenticationPage>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Router>
  );
}
