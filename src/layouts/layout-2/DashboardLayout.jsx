import { Outlet } from 'react-router-dom'; // CUSTOM COMPONENTS

import LayoutSideBar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import LayoutBodyWrapper from './components/LayoutBodyWrapper';

import LayoutProvider from './context/layoutContext';
export default function DashboardLayoutV2({
  children
}) {
  return <LayoutProvider>
      {
      /* DASHBOARD SIDEBAR CONTENT */
    }
      <LayoutSideBar />

      <LayoutBodyWrapper>
        {
        /* DASHBOARD HEADER SECTION */
      }
        <DashboardHeader />

        {
        /* MAIN CONTENT RENDER SECTION */
      }
        {children || <Outlet />}

        {
        /* LAYOUT SETTING SECTION */
      }
        
      </LayoutBodyWrapper>
    </LayoutProvider>;
}