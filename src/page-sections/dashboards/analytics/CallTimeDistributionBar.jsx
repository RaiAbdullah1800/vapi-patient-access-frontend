import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';
import { Typography } from '@mui/material';
// CUSTOM COMPONENTS
import { fetchCallTimeDistribution } from '@/api/axiosApis/get';
// CUSTOM UTILS METHODS
import { baseChartOptions } from '@/utils/baseChartOptions';

export default function CallTimeDistribution() {
  const theme = useTheme();
  const [distributionData, setDistributionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDistributionData = async () => {
      try {
        const data = await fetchCallTimeDistribution();
        setDistributionData(data);
      } catch (error) {
        console.error('Failed to fetch call distribution data', error);
      } finally {
        setLoading(false);
      }
    };

    loadDistributionData();
  }, []);

  if (loading || !distributionData) {
    return (
      <Card>
        <Box p={3}>
          <Typography variant="body1">Loading call distribution data...</Typography>
        </Box>
      </Card>
    );
  }

  const dayLabels = Object.keys(distributionData.daily_distribution);
  const dayValues = Object.values(distributionData.daily_distribution);

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
        formatter: function (val, { dataPointIndex }) {
          const originalVal = dayValues[dataPointIndex];
          return `${dayLabels[dataPointIndex]} : ${originalVal}`;
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
        <Typography variant="h6">Total Calls: {distributionData.total_calls}</Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Daily Call Distribution
        </Typography>
      </Box>

      <Chart
        type="bar"
        options={barChartOptions}
        series={[{
          name: 'Calls per Day',
          data: dayValues.map(val => val === 0 ? 0.01 : val)
        }]}
        height={200}
      />
    </Card>
  );
}
