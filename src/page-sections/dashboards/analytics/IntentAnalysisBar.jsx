import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';

import { baseChartOptions } from '@/utils/baseChartOptions';
import { fetchCallIntents } from '@/api/axiosApis/get';

export default function IntentAnalysis() {
  const theme = useTheme();
  const [intentData, setIntentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIntentStats = async () => {
      try {
        const data = await fetchCallIntents(7); // Fetch for last 7 days
        setIntentData(data);
      } catch (error) {
        console.error("Failed to fetch intent data", error);
      } finally {
        setLoading(false);
      }
    };

    loadIntentStats();
  }, []);

  if (loading || !intentData) {
    return (
      <Card>
        <Box p={3}>
          <Typography variant="body1">Loading intent data...</Typography>
        </Box>
      </Card>
    );
  }

  const intentLabels = Object.keys(intentData.intent_counts);
  const intentValues = Object.values(intentData.intent_counts);

  const chartSeries = [
    {
      name: 'Intent Count',
      data: intentValues.map(val => val === 0 ? 0.01 : val), // Inject small value for 0s
    }
  ];

  const chartOptions = merge(baseChartOptions(theme), {
    chart: {
      offsetY: 30,
    },
    xaxis: {
      categories: intentLabels,
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.grey[500],
    ],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
        distributed: true,
        borderRadiusApplication: 'end',
      }
    },
    tooltip: {
      y: {
        formatter: (val, { dataPointIndex }) => {
          const originalVal = intentValues[dataPointIndex];
          return `${intentLabels[dataPointIndex]}: ${originalVal}`;
        },
      }
    },
    legend: {
      show: false,
    }
  });

  return (
    <Card>
      <Box p={3} pb={0}>
        <Typography variant="h6">Total Calls: {intentData.total_calls}</Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Intent Breakdown: Last 7 Days
        </Typography>
      </Box>

      <Chart type="bar" options={chartOptions} series={chartSeries} height={200} />
    </Card>
  );
}
