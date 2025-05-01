import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination
} from '@mui/material';

import Scrollbar from '@/components/scrollbar';
import { TableDataNotFound } from '@/components/table';

import useMuiTable, { getComparator, stableSort } from '@/hooks/useMuiTable';

import PatientTableRow from '../PatientTableRow';
import PatientTableHead from '../PatientTableHead';

import { CALLS_DATA } from '@/__fakeData__/calls'; // You can rename this file later too

export default function PatientListView() {
  const [patients] = useState([...CALLS_DATA]);

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    handleChangePage,
    handleRequestSort,
    handleChangeRowsPerPage
  } = useMuiTable({ defaultOrderBy: 'name' , defaultRowsPerPage:8});

  const sortedPatients = stableSort(patients, getComparator(order, orderBy));

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
