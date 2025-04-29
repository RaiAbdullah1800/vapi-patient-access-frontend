import { lazy } from 'react'; // CUSTOM COMPONENTS

import Loadable from './Loadable';
import { AuthGuard } from '@/components/auth';


import LayoutV2 from '@/layouts/layout-2'; // ALL DASHBOARD PAGES


const Analytics = Loadable(lazy(() => import('@/pages/dashboard/analytics')));
const AnalyticsV2 = Loadable(lazy(() => import('@/pages/dashboard/analytics-2')));



const Profile = Loadable(lazy(() => import('@/pages/dashboard/profile'))); // REACT DATA TABLE PAGE


const ActiveLayout = () => {
  
  return  <LayoutV2 />;
};

export const DashboardRoutes = [{
  path: 'dashboard',
  element: <AuthGuard>
        <ActiveLayout />
      </AuthGuard>,
  children: [{
    index: true,
    element: <Analytics />
  }, {
    path: 'analytics-2',
    element: <AnalyticsV2 />
  }, {
    path: 'profile',
    element: <Profile />
  }]
}];