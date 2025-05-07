import Grid from '@mui/material/Grid2';

import LiveUser from '../LiveUser';
import TopQueries from '../TopQueries';

import ChartFilters from '../ChartFilters';
import IntentAnalysis from '../IntentAnalysisBar';

import SessionBrowser from '../SessionBrowser';
import SessionBrowsers from '../SessionBrowsers';

import { Typography } from '@mui/material';
import CallTimeDistribution from '../CallTimeDistributionBar';

export default function Analytics1PageView() {
  return <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        <Grid size={{lg:12, xs:12,md:12}}>
          <Typography variant="h4" fontSize={24}>
            Welcome Back!
          </Typography>
        </Grid>
        

        <Grid size={{
        lg: 6,
        xs: 12
      }}>
        <IntentAnalysis />
        </Grid>
        <Grid size={{
        lg: 6,
        xs: 12
      }}>
        <CallTimeDistribution />
        </Grid>

        <Grid size={{
        md: 8,
        xs: 12
      }}>
          <TopQueries />
        </Grid>


        <Grid size={{
        md: 4,
        xs: 12
      }}>
          <SessionBrowser />
        </Grid>

        <Grid size={{
        lg: 12,
        xs: 12
      }}>
        <SessionBrowsers/>
        </Grid>

        {
        /* DIFFERENT DATA SHOW WITH CHART */
      }
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <ChartFilters />
        </Grid>

        {
        /* LIVER ONLINE USER CHART CARD */
      }
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <LiveUser />
        </Grid>



      


      </Grid>
    </div>;
}