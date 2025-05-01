import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const INTENT_DATA = {
  intent_counts: {
    appointment_booking: 5,
  }
};

export default function AppointmentBookingCard() {
  return (
    <Card>
      <Box p={3}>
        <Typography variant="h6">Confirmed Appointments</Typography>
        <Typography variant="h4" fontWeight={600}>
          {INTENT_DATA.intent_counts.appointment_booking}
        </Typography>
      </Box>
    </Card>
  );
}
