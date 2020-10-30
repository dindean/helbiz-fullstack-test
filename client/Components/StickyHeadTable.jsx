import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'bike_id', label: 'bike_id', minWidth: 100 },
  { id: 'lat', label: 'lat', minWidth: 100, align: 'right', },
  { id: 'lon', label: 'lon', minWidth: 100, align: 'right', },
  {
    id: 'is_reserved',
    label: 'is_reserved',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'is_disabled',
    label: 'is_disabled',
    minWidth: 100,
    align: 'right',

  },
  {
    id: 'vehicle_type',
    label: 'vehicle_type',
    minWidth: 100,
    align: 'right',
  },
];

const createData = (bikeData) => {
  const { bike_id, lat, lon, is_reserved, is_disabled, vehicle_type } = bikeData
  return { bike_id, lat, lon, is_reserved, is_disabled, vehicle_type };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({allBikeData, pagination}) {
  const classes = useStyles();
  const rows = allBikeData.map(bikeData => createData(bikeData))
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.bike_id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination ?       
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> 
        : null}

    </Paper>
  );
}
