import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { authenticated } = props;
  return (
    authenticated
      ? <Outlet />
      : <Navigate replace to="/login" />
  );
};

export default ProtectedRoute;
