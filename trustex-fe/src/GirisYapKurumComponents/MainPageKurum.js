import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { MDBBtn, MDBInput, MDBCheckbox, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageKurum() {
  const [password, setPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isIndividual, setIsIndividual] = useState(true); 
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();



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

   const userType="INDIVIDUAL";
    fetch("auth/send-verification-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        corporateCustomerNumber: "",
        userType: "PERSONNEL",
        idNumber: idNumber,
        password: password,
        taxNumber: taxNumber,
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

    fetch("auth/verify-and-authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        idNumber: idNumber,
        verificationCode: verificationCode,
        userType: "PERSONNEL",


      }),
    })
    .then((res) => {
      if (!res.ok) {
        return handleFetchError(res);
      }
      return res.json();
    })
    .then((result) => {
      if(result && result.userId) {
      localStorage.setItem("tokenKey", result.token);
      localStorage.setItem("currentUser", result.userId);
      localStorage.setItem("userType", result.userType);
      setSuccessMessage(result.message);
      setSnackbarOpen(true);
      navigate("/personel-ana-sayfa");
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
  };

 

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleRegisterButton = () => {
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


  const handleBireyselClick = () => {
    navigate('/bireysel-giris');
  };

  const handleKurumsalClick = () => {
    navigate('/kurumsal-giris');
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <div
              style={{ position: 'absolute', top: '175px', left: '1152px', width: '575px', height: '540px', 
                backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}
            >
             <MDBBtnGroup aria-label='Basic example' style={{ position: 'relative', top: '80px', left: '78px', width: '300px', height: '60px', }}>
                <MDBBtn  href='#' active onClick={handleBireyselClick}
                  style={{ backgroundColor: 'white', color: 'black',  borderRight: '1px solid black', 
                     display: 'flex',  alignItems: 'center',justifyContent: 'center'}}>
                  Bireysel
                </MDBBtn>
                <MDBBtn href='#' active onClick={handleKurumsalClick}
                style={{ backgroundColor: 'white', color: 'black',  borderLeft: '1px solid black', 
                  display: 'flex',  alignItems: 'center',justifyContent: 'center'}}>
                  Personel
                </MDBBtn>
              </MDBBtnGroup>
              <Typography variant="h4" style={{ marginTop: '-60px', marginLeft: '40px', whiteSpace: 'nowrap', color: 'white' }}>
                Hızlı Ve Güvenilir İşlemler
              </Typography>
              <div className="absolute w-[300px]h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '190px', left: '180px', zIndex: 10 }} >
                <MDBInput label="Kurum No" id="firstname" type="text" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
              </div>

              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '240px', left: '180px', zIndex: 10 }} >
                <MDBInput label="Personel Kimlik Numarası" id="form1" type="soyad" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              </div>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '170px', left: '80px' }}>
                <MDBInput label="Şifre" id="form1" type="password" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {showVerificationField && (
                <div>
                <MDBInput label="Doğrulama Kodu" id="verificationCode"  type="text"value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}
                  style={{  width: '475px',  marginTop: '253px', marginLeft: '00px', color: '#white',  padding: '10px', fontSize: '16px', backgroundColor:'white'}}/>
                <Button
                  onClick={handleVerificationCodeSubmit} variant="contained"style={{ marginTop: '20px', backgroundColor:'#b8dfff', color:'black', marginLeft: '400px' }} >
                  Doğrula
                </Button>
              </div>
              )}
           
            </div>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '570px', left: '1350px', width: '150px', height: '50px', backgroundColor: "#ffffff", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }}
              onClick={handleLoginButton}
            >
              Giriş Yap
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
  <Alert onClose={handleSnackbarClose} severity={errorMessages.length > 0 ? 'error' : 'success'}>
    {errorMessages.length > 0 ? errorMessages.join(', ') : successMessage}
  </Alert>
</Snackbar>
            <Typography variant="h8" style={{ position: 'absolute', top: '635px', left: '1270px', whiteSpace: 'nowrap', color: 'white' }}>
              Üye Değil Misin?
            </Typography>
            <Link 
                  to="/bireysel-musteri-ol"
                  style={{position: 'absolute',top: '635px',left: '1390px',color: 'grey', textDecoration: 'underline',display: 'inline-block', }}>
                  Müşterimiz Ol
            </Link>
            <Link   to="/sifre-merkezi"   style={{ position: 'absolute', top: '635px', left: '1500px', color: 'grey',textDecoration: 'underline' }}>Şifremi Unuttum</Link>
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
                  <strong></strong>
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