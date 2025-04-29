'use client';

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Scrollbar from '@/components/scrollbar';

import { Paragraph } from '@/components/typography';
import { FlexBetween, FlexBox } from '@/components/flexbox';
import { HeadTableCell, BodyTableCell } from './styles';

// Mock API response
const DUMMY_CALL_RESPONSE = {
  total_calls: 50,                      // handful of calls
  average_duration_seconds: 320.45,     // ~5m20s average
  average_duration_minutes: 5.34,
  short_calls: 12,                      // quick chats
  long_calls: 8,                        // deep dives
  short_calls_percentage: 24,           // 12/50*100
  long_calls_percentage: 16,            // 8/50*100
  period: 'All time'
};


export default function CallStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(DUMMY_CALL_RESPONSE);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Card sx={{ p: 3 }}>
        <Paragraph>Loading call stats...</Paragraph>
      </Card>
    );
  }

  const entries = [
    { label: 'Total Calls', value: data.total_calls },
    { label: 'Avg. Duration (min)', value: data.average_duration_minutes.toFixed(2) },
    { label: 'Avg. Duration (sec)', value: data.average_duration_seconds.toFixed(0) },
    { label: 'Short Calls Count', value: data.short_calls },
    { label: 'Short Calls (%)', value: data.short_calls_percentage, isProgress: true },
    { label: 'Long Calls Count', value: data.long_calls },
    { label: 'Long Calls (%)', value: data.long_calls_percentage, isProgress: true }
  ];

  return (
    <Card sx={{ p: 3, pb: 1 }}>
      <FlexBetween mb={4}>
        <div>
          <Paragraph fontSize={18} fontWeight={500}>
            Call Statistics
          </Paragraph>
          <Paragraph color="text.secondary">Period: {data.period}</Paragraph>
        </div>
      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 470 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>METRIC</HeadTableCell>
              <HeadTableCell align="center">VALUE</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {entries.map((item, idx) => (
              <TableRow key={idx}>
                <BodyTableCell sx={{ color: 'grey.500' }}>{item.label}</BodyTableCell>
                <BodyTableCell>
                  {item.isProgress ? (
                    <FlexBox alignItems="center" gap={2} minWidth={100}>
                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                      />
                      <Paragraph color="text.primary" fontWeight={600}>
                        {item.value}%
                      </Paragraph>
                    </FlexBox>
                  ) : (
                    <Paragraph color="text.primary" fontWeight={600}>
                      {item.value}
                    </Paragraph>
                  )}
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}