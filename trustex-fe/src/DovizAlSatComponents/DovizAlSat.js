import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import { TablePagination, TextField, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Komisyon from './Komisyon';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function DovizAlSat() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currencies, setCurrencies] = React.useState([]);
  function createData(code, name, currencyType, buyRate, sellRate) {
    return { code, name, currencyType, buyRate, sellRate };
  }

  React.useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('/api/v1/exchange-rates/getExchangeRates', { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchCurrencies();
  }, []);

  if (!currencies) {
    return <Typography color="black">Loading asset...</Typography>;
  }

  const filteredRows = currencies.filter(row =>
    row.currencyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.currencyLabelTR.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(6);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          mt: '5%'
        }}
      >
        <Box sx={{ width: '50%', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Doviz Ara"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <Sheet
          variant="outlined"
          sx={{
            width: '50%',
            '--TableCell-height': '40px',
            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
            '--Table-firstColumnWidth': '80px',
            '--Table-lastColumnWidth': '144px',
            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
            overflow: 'hidden',
            backgroundColor: 'background.surface',
          }}
        >
          <TableContainer component={Paper}>
            <Table
              borderAxis="bothBetween"
              stripe="odd"
              hoverRow
              sx={{
                '& tr > *:first-child': {
                  position: 'sticky',
                  left: 0,
                  boxShadow: '1px 0 var(--TableCell-borderColor)',
                  bgcolor: 'background.surface',
                },
                '& tr > *:last-child': {
                  position: 'sticky',
                  right: 0,
                  bgcolor: 'var(--TableCell-headBackground)',
                },
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Döviz Cinsi</th>
                  <th style={{ width: 150 }}>Döviz Ismi</th>
                  <th style={{ width: 150 }}>Satış Kuru</th>
                  <th style={{ width: 150 }}>Alış Kuru</th>

                  <th style={{ width: 'var(--Table-lastColumnWidth)' }}>
                    &ensp;&ensp;Al &ensp;&ensp;&ensp;&ensp;Sat &ensp;
                  </th>
                </tr>
              </thead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredRows
                ).map((row) => (
                  <React.Fragment key={row.name}>
                    <tr>
                      <td>{row.currencyCode}</td>
                      <td>{row.currencyLabelTR}</td>
                      <td>{digitSetting(1 / row.buyRate)}</td>
                      <td>{digitSetting(1 / row.sellRate)}</td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Link
                            to="/transaction"
                            state={{ currencyCode: row.currencyCode }}
                          >
                            <Button size="sm" variant="solid" color="success"  >
                              AL
                            </Button></Link>
                          <Link
                            to="/transaction"
                            state={{ currencyCode: row.currencyCode }}
                          ><Button size="sm" variant="soft" color="danger">
                              SAT
                            </Button>
                          </Link>
                        </Box>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    colSpan={5}
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Sheet>
        <Komisyon />
      </Box>
    </div>
  );
}