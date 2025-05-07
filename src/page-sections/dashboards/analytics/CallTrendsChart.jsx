import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
import Chart from 'react-apexcharts';
import merge from 'lodash.merge';
import { format } from 'date-fns';
import { baseChartOptions } from '@/utils/baseChartOptions';
import { fetchCallCount } from '@/api/axiosApis/get';

// Styled components
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

const AxisLabelWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: 500,
}));

export default function CallTrendsChart({ type = 'area' }) {
  const theme = useTheme();
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchCallCount(7); // Always fetch last 7 days
        setRaw(data);
      } catch (err) {
        console.error("Error fetching call count:", err);
        setError("Failed to load call data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Card sx={{ p: 3 }}>Loading…</Card>;
  if (error) return <Card sx={{ p: 3, color: 'error.main' }}>{error}</Card>;

  const stats = [
    { id: 1, title: 'Total Count', value: raw.total_count },
    { id: 2, title: 'Period', value: raw.period },
    { id: 3, title: 'Start Date', value: format(new Date(raw.start_date), 'MMM d, yyyy') },
    { id: 4, title: 'End Date', value: format(new Date(raw.end_date), 'MMM d, yyyy') },
  ];

  const chartSeries = [{ name: 'Count', data: raw.daily_counts }];
  const chartCategories = raw.daily_dates;
  const maxY = Math.max(...raw.daily_counts) * 1.2;

  const chartOptions = merge(baseChartOptions(theme), {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { strokeDashArray: 3, borderColor: theme.palette.divider },
    xaxis: {
      show: true,
      categories: chartCategories,
      axisBorder: { show: true, color: theme.palette.divider },
      axisTicks: { show: true, color: theme.palette.divider },
      labels: {
        show: true,
        style: { colors: theme.palette.text.secondary }
      }
    },
    yaxis: {
      show: true,
      min: 0,
      max: maxY,
      tickAmount: 5,
      axisBorder: { show: true, color: theme.palette.divider },
      axisTicks: { show: true, color: theme.palette.divider },
      labels: {
        show: true,
        formatter: v => v.toLocaleString(),
        style: { colors: theme.palette.text.secondary }
      }
    },
    stroke: { curve: 'smooth' }
  });

  return (
    <Card>
      <Typography variant="h6" sx={{ px: 3, pt: 2 }}>
        Recent Call Trends
      </Typography>

      <TopContentWrapper>
        {stats.map(item => (
          <StatBox key={item.id}>
            <div style={{ fontSize: 12, color: theme.palette.text.secondary }}>
              {item.title}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>
              {item.value}
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

      <AxisLabelWrapper>
        <div>X-axis: Date (Daily)</div>
        <div>Y-axis: Call Count</div>
      </AxisLabelWrapper>
    </Card>
  );
}
