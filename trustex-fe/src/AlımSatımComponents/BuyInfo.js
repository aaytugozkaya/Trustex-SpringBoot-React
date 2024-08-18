import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';

const BuyInfo = ({ onExchangeRateChange, currencyCode }) => {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('/api/v1/exchange-rates/getExchangeRate/' + currencyCode, { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setExchangeRate(data);
        onExchangeRateChange(data);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [onExchangeRateChange]);

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(4);
  }

  if (!exchangeRate) {
    return <Typography color="white">Loading...</Typography>;
  }

  return (
    <Box p={2} border={1} borderColor="grey" borderRadius={1}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
            {exchangeRate.currencyCode} / TRY
          </Typography>
          <Typography variant="h6" color="white">
            {digitSetting(1 / exchangeRate.buyRate)} {exchangeRate.targetCurrencyCode}
          </Typography>
          <Typography variant="body2" color="white">
            (%+0.07)
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuyInfo;
