import Grid from '@mui/material/Grid2';

import LiveUser from '../LiveUser';
import TopQueries from '../TopQueries';

import ChartFilters from '../ChartFilters';
import CompleteGoal from '../CompleteGoal';
import CompleteRate from '../CompleteRate';
import SessionBrowser from '../SessionBrowser';

export default function Analytics1PageView() {
  return <div className="pt-2 pb-4">
      <Grid container spacing={3}>
      <Grid size={{
        lg: 6,
        xs: 12
      }}>
        <CompleteGoal />
        </Grid>


        <Grid size={{
        lg: 6,
        xs: 12
      }}>
        <CompleteRate />
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