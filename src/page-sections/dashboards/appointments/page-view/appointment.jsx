import Grid from '@mui/material/Grid2';

import AppointmentListPerDay from '../appointmentPerDay';
import { PatientListPageView} from '../PatientList/page-view'
import TotalAppointmentsCard from '../TotalAppointmentCard';
import AppointmentBookingCard from '../AppointmentBookingCard';
import AppointmentCancellationCard from '../AppointmentCancellationCard';
export default function AppointmentPageView() {
  return <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        <Grid size={{
        lg: 4,
        xs: 12
      }}>
        <TotalAppointmentsCard/>
        </Grid>
        <Grid size={{
        lg: 4,
        xs: 12
      }}>
        <AppointmentBookingCard/>
        </Grid>
        <Grid size={{
        lg: 4,
        xs: 12
      }}>
        <AppointmentCancellationCard/>
        </Grid>
        <Grid size={{lg:6,xs:12}}>
          
          <PatientListPageView/>
        </Grid>
        <Grid size={{lg:6,xs:12}}>
          <AppointmentListPerDay/>
        </Grid>

      </Grid>
    </div>;
}