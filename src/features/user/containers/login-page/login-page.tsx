import { Button, Typography } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../store';

interface DispatchProps {
  authorize: () => void;
}
export interface LoginPageProps extends DispatchProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ authorize }) => (
  <div>
    <Typography.Title>Nieuwe gebruiker</Typography.Title>
    <Button type="primary" onClick={() => authorize()}>
      Authorize
    </Button>
  </div>
);

const mapDispatch: DispatchProps = {
  authorize: authorize,
};
export default connect(() => ({}), mapDispatch)(LoginPage);
