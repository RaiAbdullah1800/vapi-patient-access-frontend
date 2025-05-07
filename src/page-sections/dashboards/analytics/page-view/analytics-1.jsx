import Grid from '@mui/material/Grid2';
import IntentAnalysis from '../IntentAnalysisBar';
import { Typography } from '@mui/material';
import CallTimeDistribution from '../CallTimeDistributionBar';
import CallStats from '../CallStatsDetails';
import CostSummary from '../CostSummaryPieChart';
import SentimentBreakdown from '../SentimentBreakdownPieChart';
import CallTrendsChart from '../CallTrendsChart';
import SuccessRateChart from '../CallsSuccessRateChart';

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
          <CallStats />
        </Grid>


        <Grid size={{
        md: 4,
        xs: 12
      }}>
          <CostSummary />
        </Grid>

        <Grid size={{
        lg: 12,
        xs: 12
      }}>
        <SentimentBreakdown/>
        </Grid>

        {
        /* DIFFERENT DATA SHOW WITH CHART */
      }
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <CallTrendsChart />
        </Grid>

        {
        /* LIVER ONLINE USER CHART CARD */
      }
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <SuccessRateChart />
        </Grid>

      </Grid>
    </div>;
}