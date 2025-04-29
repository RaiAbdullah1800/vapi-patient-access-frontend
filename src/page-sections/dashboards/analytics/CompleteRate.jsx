import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';
import { Typography } from '@mui/material';
// CUSTOM COMPONENTS
import Title from '@/components/title';
// CUSTOM UTILS METHODS
import { baseChartOptions } from '@/utils/baseChartOptions';

const callDistributionData = {
  total_calls: 1,
  daily_distribution: {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 1,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  }
};

export default function CallTimeDistribution() {
  const theme = useTheme();

  const dayLabels = Object.keys(callDistributionData.daily_distribution);
  const dayValues = Object.values(callDistributionData.daily_distribution);

  const barChartOptions = merge(baseChartOptions(theme), {
    chart: {
      offsetY: 30
    },
    xaxis: {
      categories: dayLabels
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.secondary.main,
      theme.palette.grey[500]
    ],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '45%',
        distributed: true,
        borderRadiusApplication: 'end'
      }
    },
    tooltip: {
      y: {
        formatter: function (val, { dataPointIndex, w }) {
          return `${w.globals.labels[dataPointIndex]} : ${val}`;
        }
      }
    },
    legend: {
      show: false
    }
  });

  return (
    <Card>
      <Box p={3} pb={0}>
        <Typography variant="h6">Total Calls: {callDistributionData.total_calls}</Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Daily Call Distribution
        </Typography>
      </Box>

      <Chart
        type="bar"
        options={barChartOptions}
        series={[{
          name: 'Calls per Day',
          data: dayValues
        }]}
        height={200} // Dynamic height based on item count
      />
    </Card>
  );
}
