
import { lazy } from 'react';
import Loadable from './Loadable';
import { AuthRoutes } from './auth';

import { DashboardRoutes } from './dashboard';
import { Navigate } from 'react-router-dom';

// Custom wrapper to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // or use your actual auth check
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ErrorPage = Loadable(lazy(() => import('@/pages/404')));

export const routes = () => {
  return [
    // Make Dashboard the new landing route, protected
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Navigate to="/dashboard" />
        </PrivateRoute>
      )
    },

    // Global error page
    {
      path: '*',
      element: <ErrorPage />
    },

    ...AuthRoutes,

    // Dashboard pages
    ...DashboardRoutes
  ];
};
