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
    return Number.parseFloat(x).toFixed(4);
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/v1/crossTransactions/getAllByUserId/" + localStorage.getItem("selectedUserId"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
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
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell><Typography variant="h6">Satilan Döviz Cinsi</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Alınan Doviz Cinsi</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">İşlem Miktari&nbsp;</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">İşlem Paritesi</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Komisyon Miktari</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Kambiyo Vergisi</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Islem Tutari</Typography></StyledTableCell>
              <StyledTableCell><Typography variant="h6">Islem Zamani</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : transactions
            ).map((transaction) => (
              <StyledTableRow key={transaction.name}>
                <StyledTableCell><Typography variant="body1">{transaction.baseCurrencyCode}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{transaction.targetCurrencyCode}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.amount)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.currencyRate)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.commissionAmount)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.foreignExchangeTax)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{digitSetting(transaction.total)}</Typography></StyledTableCell>
                <StyledTableCell><Typography variant="body1">{transaction.transactionDate}</Typography></StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter >
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={8}
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