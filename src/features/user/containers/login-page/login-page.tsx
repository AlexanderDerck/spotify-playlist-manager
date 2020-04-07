import * as React from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../store';

interface DispatchProps {
  authorize: () => void;
}
export interface LoginPageProps extends DispatchProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ authorize }) => (
  <div>
    <button className="btn btn-primary" onClick={() => authorize()}>
      Authorize
    </button>
  </div>
);

const mapDispatch: DispatchProps = {
  authorize: authorize,
};
export default connect(() => ({}), mapDispatch)(LoginPage);
