import React, { useState } from 'react';
import axios from 'axios';

import { Button, FormControl, FormLabel, OutlinedInput, Snackbar, Alert, Container, Paper, Typography, Grid } from "@mui/material";

function SifremiUnuttum() {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const handleFetchError = (res) => {
    return res.json().then((json) => {
      if (json.errors && Array.isArray(json.errors)) {
        setErrorMessages(json.errors);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    }).catch(() => {
      setErrorMessages(["Hata mesajı alınamadı."]);
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage("");

    fetch("auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: email,
    })
      .then((res) => {
        if (!res.ok) {
          return handleFetchError(res);
        }
        setSuccessMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setErrorMessages([err.message || "Bir hata oluştu"]);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>

        <Typography variant="h5" gutterBottom>
          Şifremi Unuttum
        </Typography>
        <form onSubmit={handleForgotPassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <FormLabel>E-posta Adresi</FormLabel>
                <OutlinedInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#031a55', color: '#ffffff', '&:hover': { backgroundColor: '#012a40', } }} fullWidth>
                Şifremi Sıfırla
              </Button>
            </Grid>
            {errorMessages.length > 0 && (
              <Grid item xs={12}>
                <Alert severity="error" style={{ marginTop: '16px' }}>
                  {errorMessages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                  ))}
                </Alert>
              </Grid>
            )}
          </Grid>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">
              {successMessage}
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </Container>
  );
}
export default SifremiUnuttum;