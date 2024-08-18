import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Flag from 'react-world-flags';

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

const columns = [
  { id: 'icon', label: '', minWidth: 50 },
  { id: 'currencyLabelTR', label: 'Para Birimi', minWidth: 170 },
  {
    id: 'avgCost',
    label: 'Alış Değeri',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'lastPrice',
    label: 'Satış Değeri',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'amount',
    label: 'Adet',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'valueInTL',
    label: 'TRY Değeri',
    minWidth: 100,
    align: 'right',
  },
];

export default function StickyHeadTable({ userId }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/v1/assets/user/${localStorage.getItem("selectedUserId")}/tl`, { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        const assets = await response.json();

        const formattedRows = assets.map((asset) => ({
          icon: asset.currencyCode,
          currencyLabelTR: asset.currencyLabelTR,
          avgCost: asset.buyRate.toFixed(3),
          lastPrice: asset.lastPrice.toFixed(3),
          amount: asset.amount.toFixed(3),
          valueInTL: asset.valueInTL.toFixed(1),
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '750px', overflow: 'hidden', position: 'absolute', top: '170px', left: '100px', height: 'auto' }}>
      <TableContainer sx={{ maxHeight: 'none', overflow: 'hidden' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.currencyLabelTR}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.id === 'icon' ? (
                          <Flag code={value} style={{ marginRight: 8 }} />
                        ) : (
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                        )}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}