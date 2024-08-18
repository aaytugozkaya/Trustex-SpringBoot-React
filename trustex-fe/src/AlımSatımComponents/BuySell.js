import React, {  useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { red, green } from '@mui/material/colors';
import Buy from './Buy';
import Sell from './Sell';
import BuyInfo from './BuyInfo';
import { useLocation } from 'react-router-dom';

export default function BuySellToggle() {
  const [view, setView] = useState('buy');
  const [exchangeRate, setExchangeRate] = useState(null);
  const location = useLocation();
  const { currencyCode } = location.state || {};

  return (

    <Box
      sx={{
        position: 'absolute',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '35%',
        height: '750px',
        backgroundColor: '#062065',
        color: 'white',
        padding: '10px',
        margin: '50px 0px 0px 0px',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flex: '0 1 auto', textAlign: 'center', marginBottom: '8px' }}>
        <BuyInfo onExchangeRateChange={setExchangeRate} currencyCode={currencyCode} />
      </Box>
      <ButtonGroup fullWidth variant="contained" sx={{ marginBottom: '8px' }}>
        <Button
          sx={{
            width: '50%',
            backgroundColor: view === 'buy' ? green[900] : 'white',
            color: view === 'buy' ? 'white' : 'green',
            '&:hover': {
              backgroundColor: view === 'buy' ? 'darkgreen' : 'gray',
            },
          }}
          onClick={() => setView('buy')}
        >
          Satın Al
        </Button>
        <Button
          sx={{
            width: '50%',
            backgroundColor: view === 'sell' ? red[900] : 'white',
            color: view === 'sell' ? 'white' : 'red',
            '&:hover': {
              backgroundColor: view === 'sell' ? 'darkred' : 'gray',
            },
          }}
          onClick={() => setView('sell')}
        >
          Satış Yap
        </Button>
      </ButtonGroup>

      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
          borderRadius: '6px',
        }}
      >
        {view === 'buy' ? <Buy exchangeRate={exchangeRate} currencyCode={currencyCode} /> : view === 'sell' ? <Sell exchangeRate={exchangeRate} currencyCode={currencyCode} /> : <Buy />}
      </Box>
    </Box>
  );
}