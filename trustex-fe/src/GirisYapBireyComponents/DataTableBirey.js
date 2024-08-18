import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Flag from 'react-world-flags';
import icons from 'currency-icons';
import '../App.css';
import '../GirisYapBireyCss/TableBirey.css';

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

function digitSetting(x) {
  return Number.parseFloat(x).toFixed(8);
}
export default function CustomizedTables() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('/api/v1/exchange-rates/getMain')
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table data">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Para Birimi</StyledTableCell>
            <StyledTableCell align="right">Alış</StyledTableCell>
            <StyledTableCell align="right">Satış</StyledTableCell>
            <StyledTableCell align="right">Saat</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {icons[row.currencyCode].symbol}
                <Flag
                  code={row.countryCode}
                  style={{ marginRight: 8 }}
                />
              </StyledTableCell>
              <StyledTableCell align="left">{row.currencyCode} </StyledTableCell>
              <StyledTableCell align="right">{digitSetting(1 / row.sellRate)}</StyledTableCell>
              <StyledTableCell align="right">{digitSetting(1 / row.buyRate)}</StyledTableCell>
              <StyledTableCell align="right">{row.timeStamp}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}