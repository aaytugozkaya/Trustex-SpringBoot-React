import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, FormControl, Select, MenuItem, ListSubheader, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";


export default function MainPageCapraz() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedSellOption, setSelectedSellOption] = useState('');
  const [selectedBuyOption, setSelectedBuyOption] = useState('');
  const [searchText, setSearchText] = useState("");
  const [amount, setAmount] = useState(0);
  const [buyCurrency, setBuyCurrency] = useState(null);
  const [sellCurrency, setSellCurrency] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);


  useEffect(() => {
    fetch('/api/v1/exchange-rates/getExchangeRates', { headers: { "Authorization": localStorage.getItem("tokenKey") } })
      .then(response => response.json())
      .then(data => setExchangeRates(data))
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, []);


  useEffect(() => {
    if (selectedSellOption && exchangeRates.length) {
      const sellCurrencyData = exchangeRates.find(rate => rate.currencyCode === selectedSellOption);
      setSellCurrency(sellCurrencyData);
    }
  }, [selectedSellOption, exchangeRates]);

  useEffect(() => {
    if (selectedBuyOption && exchangeRates.length) {
      const buyCurrencyData = exchangeRates.find(rate => rate.currencyCode === selectedBuyOption);
      setBuyCurrency(buyCurrencyData);
    }
  }, [selectedBuyOption, exchangeRates]);

  const filteredOptions = (searchText) =>
    exchangeRates.filter((rate) => containsText(rate.currencyLabelTR, searchText) || containsText(rate.currencyCode, searchText));

  const handleSubmit = () => {
    const requestBody = {
      userId: localStorage.getItem("selectedUserId"),
      baseCurrencyCode: selectedSellOption,
      targetCurrencyCode: selectedBuyOption,
      amount: amount
    };

    fetch('/api/v1/crossTransactions/buySell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        setTransactionResult(data);
        alert('Transfer Başarılı');
      })
      .catch(error => {
        alert('Transfer Başarısız. Lütfen Bakiyenizi Kontrol Edin.');
        console.error('Error submitting transaction:', error);
      });
  };


  const exchangeRate = sellCurrency && buyCurrency ? (1 / buyCurrency.buyRate) / (1 / sellCurrency.sellRate) : 0;
  const totalAmount = amount * exchangeRate;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: '#fff', mb: 3 }}>
            Hızlı Ve Güvenilir İşlemler
          </Typography>

        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={6} sx={{ mx: 'auto', backgroundColor: '#062065', p: 4, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
          <Typography variant="h4" sx={{ color: '#fff', mb: 4 }}>
            Çapraz İşlemler
          </Typography>


          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>Satılacak Döviz Cinsi</Typography>
                <Select
                  labelId="sell-currency-label"
                  value={selectedSellOption}
                  onChange={(e) => setSelectedSellOption(e.target.value)}
                  onClose={() => setSearchText("")}
                  sx={{ backgroundColor: 'white', color: 'black' }}
                  renderValue={() => selectedSellOption}
                >
                  <ListSubheader>
                    <TextField
                      size="small"
                      placeholder="Ara..."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {filteredOptions(searchText).map((option, i) => (
                    <MenuItem key={i} value={option.currencyCode}>
                      {option.currencyLabelTR}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>Alınacak Döviz Cinsi</Typography>
                <Select
                  value={selectedBuyOption}
                  onChange={(e) => setSelectedBuyOption(e.target.value)}
                  onClose={() => setSearchText("")}
                  sx={{ backgroundColor: 'white', color: 'black' }}
                  renderValue={() => selectedBuyOption}
                >
                  <ListSubheader>
                    <TextField
                      size="small"
                      placeholder="Ara..."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {filteredOptions(searchText).map((option, i) => (
                    <MenuItem key={i} value={option.currencyCode}>
                      {option.currencyLabelTR}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>Alınacak Tutar</Typography>
            <TextField
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: '0.5', step: '0.5', style: { fontSize: '16px' } }}
              sx={{ width: '100%', mb: 3, backgroundColor: 'white' }}
              onInput={(e) => {
                const value = parseFloat(e.target.value);
                if (value % 0.5 !== 0) {
                  e.target.value = Math.round(value * 2) / 2;
                }
              }}
            />
          </Box>
          <Box sx={{ mt: 4, p: 3, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', mb: 1 }}>İşlem Paritesi</Typography>
            <Typography variant="body1" sx={{ color: '#000', mb: 2, padding: '10px', backgroundColor: '#ffffff', borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {(buyCurrency && sellCurrency) ? ((1 / buyCurrency.buyRate) / (1 / sellCurrency.sellRate)).toFixed(3) : 0}
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', mb: 1 }}>Komisyon Öncesi Tutar</Typography>
            <Typography variant="body1" sx={{ color: '#000', mb: 2, padding: '10px', backgroundColor: '#ffffff', borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {totalAmount.toFixed(6)}
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', mb: 1 }}>Kambiyo Vergisi</Typography>
            <Typography variant="body1" sx={{ color: '#000', mb: 2, padding: '10px', backgroundColor: '#ffffff', borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {(totalAmount * 0.002).toFixed(6)}
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', mb: 1 }}>İşlem Ücreti</Typography>
            <Typography variant="body1" sx={{ color: '#000', mb: 2, padding: '10px', backgroundColor: '#ffffff', borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {(totalAmount * 0.01).toFixed(6)}
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold', mb: 1 }}>Toplam Ödenecek Tutar</Typography>
            <Typography variant="body1" sx={{ color: '#000', padding: '10px', backgroundColor: '#ffffff', borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>

              {(totalAmount + (totalAmount * 0.002) + (totalAmount * 0.01)).toFixed(6)}
            </Typography>
          </Box>


          <Button
            variant="contained"
            sx={{ mt: 4, backgroundColor: '#ffffff', color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' }, width: '100%' }}
            onClick={() => handleSubmit()}
          >
            Onayla
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;