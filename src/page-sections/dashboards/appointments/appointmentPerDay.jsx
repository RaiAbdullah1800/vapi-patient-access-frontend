import { useEffect, useState } from "react";
import { TextField, Card, Grid, Typography, Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
//import { fetchAppointmentsPerDay } from "../../../../api/axiosApis/get"; // You need to implement this API function

export default function AppointmentListPerDay() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchAppointmentsPerDay = async (date) => {
    // Simulate a slight delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          data: [
            {
              _id: "6810cd1428766db22717e2f3",
              patientInfo: {
                name: "Alice Johnson",
                dob: "20-08-1975",
                address: "78 Oak Avenue, Manchester",
                patient_id: "ace500e4fa82bce0f21c25a853c80314",
              },
              appointmentData: {
                purpose: "General Checkup",
                doctorName: "Dr. Sarah Brown",
                appointmentDate: "2025-05-01",
                appointmentTime: "2:30 PM",
              },
              confirmed: false,
              timestamp: "2025-04-29T17:59:00.087805",
            },
            {
              _id: "7810cd1428766db22717e2f4",
              patientInfo: {
                name: "Tom Harris",
                dob: "14-11-1985",
                address: "42 Maple Street, London",
                patient_id: "bde500e4fa82bce0f21c25a853c80315",
              },
              appointmentData: {
                purpose: "Dental Consultation",
                doctorName: "Dr. James Smith",
                appointmentDate: "2025-05-01",
                appointmentTime: "11:00 AM",
              },
              confirmed: true,
              timestamp: "2025-04-29T15:20:00.087805",
            },
          ],
        });
      }, 800); // Simulate network delay
    });
  };
  
  const formattedDate = selectedDate.format("YYYY-MM-DD");

  useEffect(() => {
    setLoading(true);
    setError(null);



    fetchAppointmentsPerDay(formattedDate)
      .then((res) => {
        setAppointments(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointment data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formattedDate]);

  return (
    <Card sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Appointments on {selectedDate.format("DD MMM YYYY")}
      </Typography>

      <TextField
        type="date"
        fullWidth
        value={formattedDate}
        label="Select Date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setSelectedDate(dayjs(e.target.value))}
        inputProps={{
          max: dayjs().format("YYYY-MM-DD"),
        }}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : appointments.length === 0 ? (
        <Typography>No appointments found for this date.</Typography>
      ) : (
        appointments.map((appt) => (
          <Box
            key={appt._id}
            sx={{
              borderBottom: "1px solid #ddd",
              pb: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {appt.patientInfo.name}
            </Typography>
            <Typography>Purpose: {appt.appointmentData.purpose}</Typography>
            <Typography>Doctor: {appt.appointmentData.doctorName}</Typography>
            <Typography>
              Time: {appt.appointmentData.appointmentTime}
            </Typography>
            <Typography>
              Confirmed: {appt.confirmed ? "Yes" : "No"}
            </Typography>
          </Box>
        ))
      )}
    </Card>
  );
}
