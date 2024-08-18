import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageProfilBirey() {
  const [isEditable, setIsEditable] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();
  const id = localStorage.getItem('currentUser');  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFetchError = (error) => {
    if (error.response && error.response.data) {
      const json = error.response.data;
      if (json.errors && Array.isArray(json.errors)) {
        setErrorMessages([json.errors[0]]);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    } else {
      setErrorMessages(["Hata mesajı alınamadı."]);
    }
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleFetchSuccess = (message) => {
    setSuccessMessages([message]);
    setSnackbarSeverity('success'); 
    setSnackbarOpen(true);
  };

  useEffect(() => {
    axios.get(`api/v1/personnels/${id}`, { headers: { "Authorization": localStorage.getItem("tokenKey") } })
      .then(response => {
        const personnelData = response.data;
        setFirstname(personnelData.firstname);
        setLastname(personnelData.lastname);
        setCountry(personnelData.country);
        setMobilePhone(personnelData.mobilePhone);
        setIdNumber(personnelData.idNumber);
        setEmail(personnelData.email);
        setStartDate(new Date(personnelData.dateOfBirth));
      })
      .catch(error => {
        console.error("Profil bilgileri alınırken bir hata oluştu:", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handlesifreClick = () => {
    navigate('/sifre-merkezi');
  };

  const handleçıkışClick = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("customerNumber");
    localStorage.removeItem("selectedCustomerNumber");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userName");
    localStorage.removeItem("selectedUserId");
    navigate('/');
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    const updatedData = {
      email,
      mobilePhone,
    };

    axios.put(`api/v1/personnels/${id}`, {
      updatedData,
      headers: {
         "Authorization": localStorage.getItem("tokenKey")  ,
      }})
      .then(response => {
        console.log('Başarıyla güncellendi:', response.data);
        handleFetchSuccess('Profil başarıyla güncellendi.');
        setIsEditable(false);
      })
      .catch(error => {
        handleFetchError(error);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '102.6vh' }}>
      <Container>
        <Grid container spacing={3} style={{ position: 'relative' }}>
          <Grid item xs={12} style={{ position: 'absolute' }}>
            <div
              style={{ position: 'absolute', top: '120px', left: '300px', width: '600px', height: '750px',
              backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}>
              <Typography variant="h4" style={{ position: 'absolute', textAlign: 'center', marginTop: '-20px', color: 'white', left: '240px' }}>
                Profilim
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Ad
              </Typography>
              <MDBInput
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled
                style={{ marginTop: '20px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Soyad
              </Typography>
              <MDBInput
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Kimlik No
              </Typography>
              <MDBInput
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Telefon No
              </Typography>
              <MDBInput
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                E-Posta
              </Typography>
              <MDBInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Doğum Tarihi
              </Typography>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
                showYearDropdown
                scrollableYearDropdown
                style={{
                  width: '90%',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                disabled
              />

              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', top: '680px', left: '50px', backgroundColor: '#0033a8', color: 'white', '&:hover': { backgroundColor: '#35aaff' } }}
                onClick={isEditable ? handleSaveClick : handleEditClick}
              >
                {isEditable ? "Kaydet" : "Düzenle"}
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', top: '680px', left: '300px', backgroundColor: '#35aaff', color: 'white', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handlesifreClick} >
                Şifre Değiştir
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', top: '680px', left: '450px', backgroundColor: '#e40014', color: 'white', '&:hover': { backgroundColor: '#ff8d97' } }}
                onClick={handleçıkışClick} >
                Çıkış Yap
              </Button>
            </div>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {errorMessages.length > 0
              ? errorMessages.map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))
              : successMessages.map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}