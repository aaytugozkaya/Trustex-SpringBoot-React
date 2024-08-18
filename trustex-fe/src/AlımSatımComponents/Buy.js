import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, InputAdornment, Slider, Box } from '@mui/material';

const Buy = ({ exchangeRate, currencyCode }) => {
  const [amount, setAmount] = useState('');
  const [assets, setAssets] = useState();



  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount((newValue * (1 / exchangeRate.buyRate)).toFixed(3));
  };
  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(6);
  }

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/v1/assets/user/' + localStorage.getItem("selectedUserId") + '/TRY', { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchAssets();
  }, []);

  const handleBuyNow = async () => {
    const transactionRequest = {
      userId: localStorage.getItem("selectedUserId"),
      targetCurrencyCode: currencyCode,
      transactionType: 'BUY',
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('/api/v1/transactions/buySell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey")
        },
        body: JSON.stringify(transactionRequest),
      });

      if (!response.ok) {
        alert('İşlem Başarısız. Bakiyenizi Kontrol Edin.');
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log('Transaction successful:', data);
      alert('İşlem Başarılı:');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (!exchangeRate) {
    return <Typography color="black">Loading exchange rate...</Typography>;
  }

  if (!assets) {
    return <Typography color="black">Loading asset...</Typography>;
  }

  return (
    <Box p={3} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center" color={'black'}>
        {exchangeRate.currencyLabelTR}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            label="Döviz Kuru"
            value={digitSetting(1 / exchangeRate.buyRate)}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">TRY</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            label="Kullanılabilir Bakiye"
            value={digitSetting(assets.amount)}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">TRY</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Alınacak Miktar"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{exchangeRate.currencyCode}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            step={1}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item xs={12} color={'black'}>
          <Typography>Kambiyo vergisi:{digitSetting(0.002 * (amount * (1 / exchangeRate.buyRate)))}</Typography>
          <Typography>Komisyon (TRY): {digitSetting(0.01 * (amount * (1 / exchangeRate.buyRate)))}</Typography>
          <Typography>Toplam Tutar (TRY): {digitSetting((0.002 * (amount * (1 / exchangeRate.buyRate))) + (0.01 * (amount * (1 / exchangeRate.buyRate))) + (amount * (1 / exchangeRate.buyRate)))}</Typography>
          <Typography>Kalan Kullanılabilir Bakiye (TRY): {digitSetting(assets.amount - ((0.002 * (amount * (1 / exchangeRate.buyRate))) + (0.01 * (amount * (1 / exchangeRate.buyRate))) + (amount * (1 / exchangeRate.buyRate))))}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ padding: 1.5 }}
            onClick={handleBuyNow}
          >
            Alım Yap
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Buy;