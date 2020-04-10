import { Col, Layout, Menu, Row, Typography } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { AuthenticationPage, ManagePlaylistsPage, PrivateRoute } from './containers';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Item } = Menu;

export default function App() {
  return (
    <Router>
      <Layout className={styles.pageHeight}>
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
        <Layout>
          <Sider>
            <Menu theme="dark">
              <Item>
                <Link to="/tracks" className="nav-text">
                  Tracks
                </Link>
              </Item>
            </Menu>
          </Sider>
          <Content>
            <Row justify="center">
              <Col span={18}>
                <Switch>
                  <PrivateRoute exact path="/">
                    <ManagePlaylistsPage></ManagePlaylistsPage>
                  </PrivateRoute>
                  <PrivateRoute path="/tracks">
                    <ManagePlaylistsPage></ManagePlaylistsPage>
                  </PrivateRoute>
                  <Route path="/authenticate">
                    <AuthenticationPage></AuthenticationPage>
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
