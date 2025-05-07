import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';

import Scrollbar from '@/components/scrollbar';
import { TableDataNotFound } from '@/components/table';
import { fetchPatientsList } from '@/api/axiosApis/get';
import useMuiTable, { getComparator, stableSort } from '@/hooks/useMuiTable';

import PatientTableRow from '../PatientTableRow';
import PatientTableHead from '../PatientTableHead';

export default function PatientListView() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    handleChangePage,
    handleRequestSort,
    handleChangeRowsPerPage
  } = useMuiTable({ defaultOrderBy: 'name', defaultRowsPerPage: 8 });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetchPatientsList();
        if (response?.status === 'success' && Array.isArray(response.data)) {
          const transformed = response.data.map((item) => ({
            id: item.patient_id,
            name: item.name,
            totalCalls: item.totalCalls,
            dob: item.dob,
            address: item.address,
            status: item.status,
            totalCost: item.totalCost
          }));
          setPatients(transformed);
        } else {
          setPatients([]);
        }
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        setError('Unable to load patient data.');
      } finally {
        setLoading(false);
      }
    };
  
    loadPatients();
  }, []);

  const sortedPatients = stableSort(patients, getComparator(order, orderBy));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="pt-2 pb-4">
      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <PatientTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {sortedPatients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient, idx) => (
                    <PatientTableRow
                      key={patient.id}
                      patient={patient}
                      index={page * rowsPerPage + idx}
                    />
                  ))}

                {patients.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          component="div"
          count={patients.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[8]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </div>
  );
}
