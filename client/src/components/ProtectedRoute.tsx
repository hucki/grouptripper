import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...props }) =>
  component ? (
    <Route component={withAuthenticationRequired(component)} {...props} />
  ) : null;

export default ProtectedRoute;
