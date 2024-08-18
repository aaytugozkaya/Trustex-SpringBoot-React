import React, { useState } from 'react';
import { MDBBtn, MDBBtnGroup, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';
export default function MainPageBirey({ }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [idNumber, setIdNumber] = useState("");

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [setIsIndividual] = useState(true);

  const navigate = useNavigate();
  const handlegirisClick = () => {
    navigate('/bireysel-giris');
  };
  const handlekurumClick = () => {
    navigate('/kurumsal-giris');
  };


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


  const sendLoginRequest = () => {
    const userType = "INDIVIDUAL";
    fetch("auth/send-verification-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        corporateCustomerNumber: "",
        userType: "INDIVIDUAL",
        idNumber: idNumber,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return handleFetchError(res);
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("userName", idNumber);
          localStorage.setItem("userPassword", password);
          setShowVerificationField(true);
          setSuccessMessage("Doğrulama kodu gönderildi.");
          setSnackbarOpen(true);


        }
      })
      .catch((err) => {
        setErrorMessages([err.message]);

        setSnackbarOpen(true);
      });
  };



  const sendVerificationCode = () => {
    const userId = localStorage.getItem("currentUser");
    const idNumber = localStorage.getItem("userName");
    const password = localStorage.getItem("userPassword");
    

    fetch("auth/verify-and-authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        idNumber: idNumber,
        verificationCode: verificationCode,
        userType: "INDIVIDUAL"
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return handleFetchError(res);
        }
        return res.json();
      })
      .then((result) => {
        if (result && result.userId) {
          localStorage.setItem("tokenKey", result.token);
          localStorage.setItem("currentUser", result.userId);
          localStorage.setItem("selectedCustomerNumber", result.customerNumber);
          localStorage.setItem("selectedUserId", result.userId);
          localStorage.setItem("userType", result.userType);
          setSuccessMessage(result.message);
          setSnackbarOpen(true);
          navigate("/hesap-ozetim");
        }
      })
      .catch((err) => {
        setErrorMessages([err.message]);
      });
  };

  const handleLoginButton = () => {
    console.log('idNumber:', idNumber);
    console.log('Password:', password);
    setErrorMessages([]);
    sendLoginRequest();
    setUsername("");

  };



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleVerificationCodeSubmit = () => {
    setErrorMessages([]);
    sendVerificationCode();
  };

  const handleCustomerTypeChange = (isIndividual) => {
    setIsIndividual(isIndividual);
    console.log("Selected UserType:", isIndividual ? "Individual" : "Corporate");
  };
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <div
              style={{
                position: 'absolute', top: '175px', left: '1152px', width: '575px', height: '540px',
                backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px'
              }}>
              <MDBBtnGroup aria-label='Basic example' style={{ position: 'relative', top: '80px', left: '78px', width: '300px', height: '60px', }}>
                <MDBBtn href='#' active
                  style={{
                    backgroundColor: 'white', color: 'black', borderRight: '1px solid black',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }} onClick={handlegirisClick}>
                  Bireysel

                </MDBBtn>
                <MDBBtn href='#' active
                  style={{
                    backgroundColor: 'white', color: 'black', borderLeft: '1px solid black',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }} onClick={handlekurumClick}>
                  Personel
                </MDBBtn>
              </MDBBtnGroup>
              <Typography variant="h4" style={{ marginTop: '-50px', marginLeft: '40px', whiteSpace: 'nowrap', color: 'white' }}>
                Hızlı Ve Güvenilir İşlemler
              </Typography>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '150px', left: '80px' }}>
                <MDBInput label="Şifre" id="form1" type="password" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '90px', left: '80px' }}>
                <MDBInput label="TC Kimlik No veya Müşteri No" id="TCKN" type="text" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              </div>

              {showVerificationField && (
                <div>
                  <MDBInput label="Doğrulama Kodu" id="verificationCode" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}
                    style={{ width: '475px', marginTop: '227px', marginLeft: '00px', color: '#white', padding: '10px', fontSize: '16px', backgroundColor: 'white' }} />
                  <Button
                    onClick={handleVerificationCodeSubmit} variant="contained" style={{ marginTop: '20px', backgroundColor: '#b8dfff', color: 'black', marginLeft: '400px' }} >
                    Doğrula
                  </Button>
                </div>
              )}
            </div>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '560px', left: '1350px', width: '150px', height: '50px', backgroundColor: "#ffffff", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }}
              onClick={handleLoginButton} >
              Giriş Yap
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity={errorMessages.length > 0 ? 'error' : 'success'}>
                {errorMessages.length > 0 ? errorMessages.join(', ') : successMessage}
              </Alert>
            </Snackbar>

            <Typography variant="h8" style={{ position: 'absolute', top: '625px', left: '1270px', whiteSpace: 'nowrap', color: 'white' }}>
              Üye Değil Misin?
            </Typography>
            <Link
              to="/bireysel-musteri-ol"
              style={{ position: 'absolute', top: '625px', left: '1390px', color: 'grey', textDecoration: 'underline', display: 'inline-block', }}>
              Müşterimiz Ol
            </Link>
            <Link to="/sifre-merkezi" style={{ position: 'absolute', top: '625px', left: '1500px', color: 'grey', textDecoration: 'underline' }}>Şifremi Unuttum</Link>
          </Grid>
        </Grid>

        {errorMessages.length > 0 && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px',
            borderRadius: '5px',
            border: '1px solid #f5c6cb',
            marginTop: '10px',
            marginBottom: '20px'
          }}>
            <strong>Hata Mesajları:</strong>
            <ul style={{ padding: '0', listStyleType: 'none', margin: '0' }}>
              {errorMessages.map((error, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

    </div>
  );
}