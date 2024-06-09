// src/components/AdminRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  const navigate = Navigate()

  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <navigate to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
