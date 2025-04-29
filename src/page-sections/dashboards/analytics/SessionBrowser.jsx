'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
import merge from 'lodash.merge';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import MoreButton from '@/components/more-button';
import { Paragraph } from '@/components/typography';
import { FlexBetween, FlexBox } from '@/components/flexbox';
import { baseChartOptions } from '@/utils/baseChartOptions';
import { format } from '@/utils/currency';

const StyledChart = styled(Chart)({
  marginBottom: 24,
});

// Mock API response for cost summary
const DUMMY_COST_RESPONSE = {
  total_calls: 50,
  total_cost: 12.345,
  stt_cost: 0.077,
  llm_cost: 0.011,
  tts_cost: 0.1566,
  vapi_cost: 0.3795,
  period: 'All time',
};

export default function CostSummary() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(DUMMY_COST_RESPONSE);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Card sx={{ p: 3 }}>
        <Paragraph color="text.secondary">{t('Loading cost summary...')}</Paragraph>
      </Card>
    );
  }

  // Prepare chart data
  const chartSeries = [
    data.stt_cost,
    data.llm_cost,
    data.tts_cost,
    data.vapi_cost,
  ];

  const chartLabels = ['STT', 'LLM', 'TTS', 'VAPI'];

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
      y: {
        formatter: (val) => format(val),
      },
    },
    legend: { show: false },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
  });

  const items = [
    { id: 'stt', label: 'STT', value: data.stt_cost, color: theme.palette.primary.main },
    { id: 'llm', label: 'LLM', value: data.llm_cost, color: theme.palette.success.main },
    { id: 'tts', label: 'TTS', value: data.tts_cost, color: theme.palette.warning.main },
    { id: 'vapi', label: 'VAPI', value: data.vapi_cost, color: theme.palette.error.main },
  ];

  return (
    <Card className="h-full">
      <FlexBetween p={1}>
        <Paragraph fontSize={18} fontWeight={500}>
          {t('Cost Breakdown')}
        </Paragraph>
      </FlexBetween>

      {/* Subheading style for totals */}
      <Box px={3} pb={2}>
        <Paragraph color="text.secondary" fontSize={14} fontWeight={500}>
          {t('Total Calls')}: {data.total_calls}
        </Paragraph>
        <Paragraph color="text.secondary" fontSize={14} fontWeight={500}>
          {t('Total Cost')}: {format(data.total_cost)}
        </Paragraph>
      </Box>

      <StyledChart
        height={200}
        type="donut"
        options={chartOptions}
        series={chartSeries}
      />

      {items.map((item) => (
        <FlexBox
          key={item.id}
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
            <Paragraph fontWeight={600}>{format(item.value)}</Paragraph>
          </FlexBetween>
        </FlexBox>
      ))}
    </Card>
  );
}
