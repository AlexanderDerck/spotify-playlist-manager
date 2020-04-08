import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getIsAuthenticated } from '../../store/user';
import { RootState } from '../../store/root-state';

export interface PrivateRouteProps extends RouteProps, StateProps {}
interface StateProps {
  isAuthenticated: boolean;
}

export const PrivateRoute: React.StatelessComponent<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/authenticate',
            state: { from: location },
          }}
        />
      )
    }
  />
);

const mapState = (state: RootState): StateProps => ({
  isAuthenticated: getIsAuthenticated(state),
});
export default connect(mapState)(PrivateRoute);
