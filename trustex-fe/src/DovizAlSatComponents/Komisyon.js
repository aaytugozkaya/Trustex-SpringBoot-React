import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TableHead, TableRow, TableCell, TableContainer, Paper, TableBody, tableCellClasses } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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



export default function Komisyon() {
  return (
    <Box sx={{ width: '50%', paddingTop: '5%' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{

            color: 'green',
            borderRadius: '8px',
            '& .MuiAccordionSummary-content': {
              borderRadius: '8px'
            }
          }}
        >
          <Typography>Komisyon Detaylari</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderRadius: '8px' }}>
          <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
            <Table sx={{ minWidth: 700, borderRadius: '8px' }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Komisyon Kademesi</TableCell>
                  <TableCell align="left">Alim - Satim Komisyon Miktari</TableCell>
                  <TableCell align="left">Islem Hacmi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    1.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.20</StyledTableCell>
                  <StyledTableCell align="left">0-2.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    2.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.19</StyledTableCell>
                  <StyledTableCell align="left">2.000-10.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    3.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.18</StyledTableCell>
                  <StyledTableCell align="left">10.000-25.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    4.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.16</StyledTableCell>
                  <StyledTableCell align="left">25.000-100.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    5.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.12</StyledTableCell>
                  <StyledTableCell align="left">100.000-250.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    6.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.10</StyledTableCell>
                  <StyledTableCell align="left">250.000-1.000.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    7.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.09</StyledTableCell>
                  <StyledTableCell align="left">1.000.000-2.000.000 TRY</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell scope="row">
                    8.Kademe
                  </StyledTableCell>
                  <StyledTableCell align="left">%0.08</StyledTableCell>
                  <StyledTableCell align="left">2.000.000+ TRY</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}