import { Col, Layout, Row, Typography } from 'antd';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './containers';
import { AuthenticationPage } from './containers';

const { Header, Content } = Layout;
const { Text } = Typography;

export default function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <img width="200px" src="/Spotify_Logo_RGB_Green.png" alt="logo" />
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
