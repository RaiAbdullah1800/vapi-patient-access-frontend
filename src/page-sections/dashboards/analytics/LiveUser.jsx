'use client';

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
import Chart from 'react-apexcharts';
import merge from 'lodash.merge';
import { format } from 'date-fns';
import { baseChartOptions } from '@/utils/baseChartOptions';
import { Box , Typography } from '@mui/material';
// Dummy responses for demo (mock API)
const DUMMY_SUCCESS_RESPONSES = {
  7: {
    "success_rate": 100,
    "successful_calls": 1,
    "total_calls": 1,
    "period": "Last 7 days",
    "start_date": "2025-04-21T18:20:44.121533",
    "end_date": "2025-04-28T18:20:44.121533",
    "daily_success_rates": [
      0,
      100,
      0,
      0,
      0,
      0,
      0
    ],
    "daily_dates": [
      "2025-04-21",
      "2025-04-22",
      "2025-04-23",
      "2025-04-24",
      "2025-04-25",
      "2025-04-26",
      "2025-04-27"
    ]
  }
};


// STYLED WRAPPERS
const ChartWrapper = styled('div')({
  paddingInline: '.5rem',
  '& .apexcharts-tooltip-text-y-value': { marginLeft: 0 },
  '& .apexcharts-xaxistooltip': { display: 'none !important' }
});

const TopContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  padding: theme.spacing(2, 2, 0, 2),
}));

const StatBox = styled('div')(({ theme, active }) => ({
  flex: '1 1 120px',
  padding: theme.spacing(1.5),
  borderRadius: '0 0 12px 12px',
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
}));

export default function SuccessRateChart({
  days = 7,
  type = 'line'
}) {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(DUMMY_SUCCESS_RESPONSES[days] || DUMMY_SUCCESS_RESPONSES[7]);
      setLoading(false);
    }, 300);
  }, [days]);

  if (loading) return <Card sx={{ p: 3 }}>Loading your success... or lack of it 😅</Card>;

  const stats = [
    { id: 1, title: 'Success Rate', value: `${data.success_rate}%` },
    { id: 2, title: 'Successful Calls', value: data.successful_calls },
    { id: 3, title: 'Total Calls', value: data.total_calls },
    { id: 4, title: 'Period', value: data.period },
    { id: 5, title: 'Start Date', value: format(new Date(data.start_date), 'MMM d, yyyy') },
    { id: 6, title: 'End Date', value: format(new Date(data.end_date), 'MMM d, yyyy') },
  ];

  const chartSeries = [{ name: 'Success Rate (%)', data: data.daily_success_rates }];
  const chartCategories = data.daily_dates;
  const maxY = 100;

  const chartOptions = merge(
    baseChartOptions(theme),
    {
      chart: { toolbar: { show: false } },
      dataLabels: { enabled: true },
      legend: { show: false },
      grid: { strokeDashArray: 3, borderColor: theme.palette.divider },
      xaxis: {
        categories: chartCategories,
        axisBorder: {
          show: true,
          color: theme.palette.divider,
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider,
        },
        labels: { 
          style: { colors: theme.palette.text.secondary }
        }
      },
      yaxis: {
        min: 0,
        max: maxY,
        tickAmount: 5,
        axisBorder: {
          show: true,
          color: theme.palette.divider,
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider,
        },
        labels: { 
          formatter: v => `${v}%`,
          style: { colors: theme.palette.text.secondary }
        }
      },
      stroke: { curve: 'smooth' }
    }
  );

  return (
    <Card>
      <Box px={3} pt={3}>
        <Typography variant="h6" fontWeight={600}>
          Weekly Success Rate Overview
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Tracking daily performance over the selected period
        </Typography>
      </Box>

      <TopContentWrapper>
        {stats.map(stat => (
          <StatBox key={stat.id}>
            <div style={{ fontSize: 12, color: theme.palette.text.secondary }}>
              {stat.title}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>
              {stat.value}
            </div>
          </StatBox>
        ))}
      </TopContentWrapper>

      <ChartWrapper>
        <Chart
          type={type}
          height={350}
          series={chartSeries}
          options={chartOptions}
        />
      </ChartWrapper>
    </Card>
  );
}
