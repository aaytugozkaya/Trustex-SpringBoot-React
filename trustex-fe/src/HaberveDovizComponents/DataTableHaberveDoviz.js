import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#031a55',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/v1/exchange-rates/getExchangeRates', { headers: { "Authorization": localStorage.getItem("tokenKey") } })
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(8);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(filteredRows.length / rowsPerPage) - 1;
    setPage(lastPage);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredRows = rows.filter((row) =>
    row.currencyLabelTR.toLowerCase().includes(searchQuery) ||
    row.currencyCode.toLowerCase().includes(searchQuery)
  );
  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '800px', height: '600px', overflow: 'hidden', position: 'absolute', top: '180px', left: '1070px' }}>
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Arama"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ülke İsmi</StyledTableCell>
              <StyledTableCell align="center">Döviz Kodu</StyledTableCell>
              <StyledTableCell align="center">Alış</StyledTableCell>
              <StyledTableCell align="center">Satış</StyledTableCell>
              <StyledTableCell align="center">Tarih</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <StyledTableRow key={row.currencyCode}>
                <StyledTableCell component="th" scope="row">
                  {row.currencyLabelTR}
                </StyledTableCell>
                <StyledTableCell align="center">{row.currencyCode}</StyledTableCell>
                <StyledTableCell align="center">{digitSetting(row.buyRate)}</StyledTableCell>
                <StyledTableCell align="center">{digitSetting(row.sellRate)}</StyledTableCell>
                <StyledTableCell align="center">{row.timeStamp}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box>
          <IconButton
            onClick={handleFirstPage}
            disabled={page === 0}
            aria-label="first page"
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={handleLastPage}
            disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
            aria-label="last page"
          >
            <LastPageIcon />
          </IconButton>
        </Box>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
}