import { Box } from '@mui/material';
import { DashboardHeaderRoot, StyledToolBar } from '../styles';
import ProfilePopover from '@/layouts/layout-parts/popovers/ProfilePopover';

export default function DashboardHeader() {
  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        <Box flexGrow={1} ml={1} />
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
}
