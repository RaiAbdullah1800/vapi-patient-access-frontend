import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const INTENT_DATA = {
  intent_counts: {
    appointment_cancellation: 1,
  }
};

export default function AppointmentCancellationCard() {
  return (
    <Card>
      <Box p={3}>
        <Typography variant="h6">Appointment Cancellations</Typography>
        <Typography variant="h4" fontWeight={600}>
          {INTENT_DATA.intent_counts.appointment_cancellation}
        </Typography>
      </Box>
    </Card>
  );
}
