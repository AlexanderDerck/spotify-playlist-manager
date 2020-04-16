import { Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { PageHeader } from './components';
import { AuthenticationPage, PrivateRoute, TracksPage } from './containers';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout className={styles.pageHeight}>
        <Header>
          <PageHeader></PageHeader>
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
          <Content className="py-4">
            <Row justify="center">
              <Col span={22}>
                <Switch>
                  <PrivateRoute exact path="/">
                    <TracksPage></TracksPage>
                  </PrivateRoute>
                  <PrivateRoute path="/tracks">
                    <TracksPage></TracksPage>
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
