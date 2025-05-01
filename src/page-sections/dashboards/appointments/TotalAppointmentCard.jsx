import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const INTENT_DATA = {
  intent_counts: {
    appointment_booking: 5,
    appointment_cancellation: 1,
  }
};

export default function TotalAppointmentsCard() {
  const totalAppointments =
    INTENT_DATA.intent_counts.appointment_booking +
    INTENT_DATA.intent_counts.appointment_cancellation;

  return (
    <Card>
      <Box p={3}>
        <Typography variant="h6">Total Appointments</Typography>
        <Typography variant="h4" fontWeight={600}>
          {totalAppointments}
        </Typography>
      </Box>
    </Card>
  );
}
