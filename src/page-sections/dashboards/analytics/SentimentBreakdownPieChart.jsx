'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';
import { Paragraph } from '@/components/typography';
import { FlexBetween, FlexBox } from '@/components/flexbox';
import { baseChartOptions } from '@/utils/baseChartOptions';
import { fetchSentimentCounts } from '@/api/axiosApis/get';

const StyledChart = styled(Chart)({
  marginBottom: 24,
});

export default function SentimentBreakdown() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSentimentCounts(); // or pass days: fetchSentimentCounts(7)
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load sentiment data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Card sx={{ p: 3 }}>
        <Paragraph color="text.secondary">Loading sentiment breakdown...</Paragraph>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 3 }}>
        <Paragraph color="error.main">{error}</Paragraph>
      </Card>
    );
  }

  const { total_calls, sentiment_counts } = data;

  const chartLabels = ['Very Happy', 'Happy', 'Neutral', 'Unhappy', 'Unknown'];
  const chartSeries = [
    sentiment_counts.very_happy,
    sentiment_counts.happy,
    sentiment_counts.neutral,
    sentiment_counts.unhappy,
    sentiment_counts.unknown,
  ];

  const chartOptions = merge(baseChartOptions(theme), {
    chart: { toolbar: { show: false } },
    labels: chartLabels,
    plotOptions: {
      pie: {
        donut: { size: '70%' },
        expandOnClick: false,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: { formatter: (val) => `${val} calls` },
    },
    legend: { show: false },
    colors: [
      theme.palette.success.dark,
      theme.palette.success.main,
      theme.palette.grey[500],
      theme.palette.error.main,
      theme.palette.warning.main,
    ],
  });

  const sentiments = [
    { label: 'Very Happy', value: sentiment_counts.very_happy, color: theme.palette.success.dark },
    { label: 'Happy', value: sentiment_counts.happy, color: theme.palette.success.main },
    { label: 'Neutral', value: sentiment_counts.neutral, color: theme.palette.grey[500] },
    { label: 'Unhappy', value: sentiment_counts.unhappy, color: theme.palette.error.main },
    { label: 'Unknown', value: sentiment_counts.unknown, color: theme.palette.warning.main },
  ];

  return (
    <Card>
      <Box p={3}>
        <Paragraph fontSize={18} fontWeight={600}>
          Sentiment Breakdown
        </Paragraph>
        <Paragraph color="text.secondary" fontSize={14}>
          Total Calls: {total_calls}
        </Paragraph>
      </Box>

      <StyledChart
        height={220}
        type="donut"
        options={chartOptions}
        series={chartSeries}
      />

      {sentiments.map((item, idx) => (
        <FlexBox
          key={idx}
          px={3}
          py={1}
          alignItems="center"
          borderTop="1px dashed"
          borderColor="divider"
        >
          <Box
            width={10}
            height={10}
            borderRadius="50%"
            bgcolor={item.color}
            mr={2}
          />
          <FlexBetween flexGrow={1}>
            <Paragraph fontWeight={500}>{item.label}</Paragraph>
            <Paragraph fontWeight={600}>{item.value}</Paragraph>
          </FlexBetween>
        </FlexBox>
      ))}
    </Card>
  );
}
