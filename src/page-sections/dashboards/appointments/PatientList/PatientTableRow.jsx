import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function PatientTableRow({ patient, index }) {
  return (
    <TableRow hover>
      {/* No. */}
      <TableCell sx={{ paddingLeft: 3 }} component="th" scope="row">
        {index + 1}
      </TableCell>

      {/* Patient Name */}
      <TableCell padding="normal" sx={{ color: 'text.primary', fontWeight: 500 }}>
        {patient.name}
      </TableCell>

      {/* Total Calls */}
      <TableCell align="left" sx={{ fontWeight: 500, paddingLeft: 4 }}>
        {patient.totalCalls}
      </TableCell>
    </TableRow>
  );
}
