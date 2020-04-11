import { Button, Row, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../store/actions';

const { Title } = Typography;

export interface AuthenticationPageProps extends DispatchProps {}
interface DispatchProps {
  authenticate: () => void;
}

const AuthenticationPage: React.FunctionComponent<AuthenticationPageProps> = ({ authenticate }) => (
  <React.Fragment>
    <Row>
      <Title>Nieuwe gebruiker</Title>
    </Row>
    <Row>
      <Button type="primary" onClick={() => authenticate()}>
        Authenticate
      </Button>
    </Row>
  </React.Fragment>
);

const mapDispatch: DispatchProps = {
  authenticate: authorize,
};
export default connect(null, mapDispatch)(AuthenticationPage);
