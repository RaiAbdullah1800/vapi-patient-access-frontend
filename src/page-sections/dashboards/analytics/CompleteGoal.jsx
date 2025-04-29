import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';

import { baseChartOptions } from '@/utils/baseChartOptions';

const INTENT_DATA = {
  total_calls: 9,
  intent_counts: {
    appointment_booking: 5,
    appointment_cancellation: 1,
    prescription_check: 1,
    test_results_check: 1,
    transferred_to_human: 1,
    other: 0
  }
};

const intentLabels = Object.keys(INTENT_DATA.intent_counts);
const intentValues = Object.values(INTENT_DATA.intent_counts);

export default function IntentAnalysis() {
  const theme = useTheme();

  const chartSeries = [
    {
      name: 'Intent Count',
      data: intentValues
    }
  ];

  const chartOptions = merge(baseChartOptions(theme), {
    chart: {
      offsetY: 30
    },
    xaxis: {
      categories: intentLabels
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.grey[500]
    ],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
        distributed: true,
        borderRadiusApplication: 'end'
      }
    },
    tooltip: {
      y: {
        formatter: (val, { dataPointIndex }) => `${intentLabels[dataPointIndex]}: ${val}`
      }
    },
    legend: {
      show: false
    }
  });

  return (
    <Card>
      <Box p={3} pb={0}>
        <Typography variant="h6">Total Calls: {INTENT_DATA.total_calls}</Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Intent Breakdown
        </Typography>
      </Box>

      <Chart type="bar" options={chartOptions} series={chartSeries} height={200} />
    </Card>
  );
}
