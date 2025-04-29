import { Fragment } from 'react';
import { Card, Box, IconButton, Link } from '@mui/material';
import CameraAlt from '@mui/icons-material/CameraAlt';
import styled from '@mui/material/styles/styled';

import AvatarBadge from '@/components/avatar-badge';
import AvatarLoading from '@/components/avatar-loading';
import { FlexBox, FlexBetween } from '@/components/flexbox';
import { H6, Small } from '@/components/typography';

import DateRange from '@/icons/DateRange';
import Bratislava from '@/icons/Bratislava';
import MapMarkerIcon from '@/icons/MapMarkerIcon';
import ListItem from './ListItem';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WebIcon from '@mui/icons-material/Web';

// ======================== Styled Components ========================
const ContentWrapper = styled('div')({
  zIndex: 1,
  padding: 24,
  marginTop: 55,
  position: 'relative',
  textAlign: 'center',
});

const StyledFlexBetween = styled(FlexBetween)({
  margin: '16px auto 0',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 20,
  maxWidth: 360,
});

const DetailSection = styled('div')({
  marginTop: 24,
  padding: '12px 0',
  borderTop: '1px solid #e0e0e0',
  textAlign: 'left',
  '& h6': {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  '& .contact-item': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
});

// ======================== Component ========================
export default function Layout() {
  return (
    <Fragment>
      <Card sx={{ position: 'relative', overflow: 'visible' }}>
        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    style={{ display: 'none' }}
                  />
                  <IconButton component="span" aria-label="upload picture">
                    <CameraAlt sx={{ fontSize: 16, color: 'background.paper' }} />
                  </IconButton>
                </label>
              }
            >
              <AvatarLoading
                alt="User"
                borderSize={2}
                percentage={100}
                src="/static/user/user-8.png"
                sx={{ width: 100, height: 100 }}
              />
            </AvatarBadge>
          </FlexBox>

          <Box mt={2}>
            <H6 fontSize={18}>Aaron Cooper</H6>
            <Small color="text.secondary">ADMIN</Small>

            <StyledFlexBetween>
              <ListItem title="Developer" Icon={Bratislava} />
              <ListItem title="New York, USA" Icon={MapMarkerIcon} />
              <ListItem title="Joined Jan 2021" Icon={DateRange} />
            </StyledFlexBetween>
          </Box>

          <DetailSection>
            <H6 fontSize={16}>Contact Information</H6>
            <Box mt={2}>
              <div className="contact-item">
                <MailOutlineIcon color="primary" />
                <Small color="text.secondary">Email: </Small>
                <Link href="mailto:aaron@example.com" underline="hover">
                aaron@example.com
                </Link>
              </div>
              <div className="contact-item">
                <PhoneInTalkIcon color="primary" />
                <Small color="text.secondary">Phone: </Small>
                <Small>(+1) 555-1234</Small>
              </div>
              <div className="contact-item">
                <WebIcon color="primary" />
                <Small color="text.secondary">Website: </Small>
                <Link href="https://aaronsportfolio.com" target="_blank" underline="hover">
                  Aarosportfolio.com
                </Link>
              </div>
            </Box>
          </DetailSection>

        </ContentWrapper>
      </Card>
    </Fragment>
  );
}
