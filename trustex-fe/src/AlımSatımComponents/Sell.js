import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, InputAdornment, Slider, Box } from '@mui/material';

const Sell = ({ exchangeRate, currencyCode }) => {
  const [amount, setAmount] = useState('');
  const [assets, setAssets] = useState();
  const userId = localStorage.getItem("selectedUserId");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount((newValue * (1 / exchangeRate.sellRate)).toFixed(3));
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/v1/assets/user/'+localStorage.getItem("selectedUserId")+'/' + currencyCode, { headers: { "Authorization": localStorage.getItem("tokenKey") } });
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

  const handleSellTransaction = async () => {
    const transactionData = {
      userId: userId,
      transactionType: 'SELL',
      targetCurrencyCode: currencyCode,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('/api/v1/transactions/buySell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        alert('İşlem Başarısız. Bakiyenizi Kontrol Edin.');
        throw new Error(`Error: ${response.status}`);

      }

      const data = await response.json();
      console.log('Transaction successful:', data);
      alert('İşlem Başarılı:');
      window.location.reload();
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(6);
  }

  if (!assets) {
    return <Typography color="black">Loading asset...</Typography>;
  }
  if (!exchangeRate) {
    return <Typography color="black">Loading exchange rate...</Typography>;
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
            value={digitSetting(1 / exchangeRate.sellRate)}
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
            label="Kullanılabilir Bakıye"
            value={digitSetting(assets.amount)}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">{exchangeRate.currencyCode}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Satılacak Miktar"
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
          <br />
          <Typography>Komisyon (TRY): {digitSetting(0.01 * (amount * 1 / exchangeRate.sellRate))}</Typography>
          <Typography>Toplam Tutar (TRY): {digitSetting((amount * (1 / exchangeRate.sellRate)) + (0.01 * (amount * 1 / exchangeRate.sellRate)))}</Typography>
          <Typography>Kalan Kullanılabilir Bakiye ({exchangeRate.currencyCode}): {assets.amount - amount}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ padding: 1.5 }}
            onClick={handleSellTransaction}
          >
            Satış Yap
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sell;