import { Button, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../store/user';

const { Title } = Typography;

export interface AuthenticationPageProps extends DispatchProps {}
interface DispatchProps {
  authorize: () => void;
}

const AuthenticationPage: React.FunctionComponent<AuthenticationPageProps> = ({ authorize }) => (
  <div>
    <Title>Nieuwe gebruiker</Title>
    <Button type="primary" onClick={() => authorize()}>
      Authorize
    </Button>
  </div>
);

const mapDispatch: DispatchProps = {
  authorize: authorize,
};
export default connect(() => ({}), mapDispatch)(AuthenticationPage);
