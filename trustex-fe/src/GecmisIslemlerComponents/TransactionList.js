import React, { useEffect, useState } from 'react';
import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Typography } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';


const headerColor = '#031a55';
const cellColor = '#abddff';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: headerColor,
      color: theme.palette.common.white,
      textAlign: 'center',
      fontSize: '1.25rem',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '1.25rem',
      textAlign: 'center',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: cellColor,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/v1/transactions/byUser/"+localStorage.getItem("selectedUserId"), {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("tokenKey"),
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setTransactions(data.reverse());
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" margin="50px">
      <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto' }}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell><Typography variant="h6">Alınan Döviz Cinsi</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Alınan Miktar&nbsp;</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">İşlem Tutarı&nbsp;</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">İşlem Türü</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : transactions
            ).map((transaction) => (
              <StyledTableRow key={transaction.name}>
                <StyledTableCell><Typography variant="body1">{transaction.targetCurrencyCode}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.amount)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.total)}</Typography></StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body1" style={{ color: transaction.transactionType === 'BUY' ? 'green' : 'red' }}>
                    {transaction.transactionType === 'BUY' ? 'ALIM' : 'SATIM'}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                sx={{
                  '& .MuiTablePagination-select': {
                    backgroundColor: cellColor,
                  },
                  '& .MuiTablePagination-actions button': {
                    color: cellColor,
                  },
                  '& .MuiTablePagination-toolbar': {
                    backgroundColor: headerColor,
                    color: '#fff',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionList;