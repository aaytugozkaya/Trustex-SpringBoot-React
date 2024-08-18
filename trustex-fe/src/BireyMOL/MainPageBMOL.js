import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountrySelect from 'react-bootstrap-country-select';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import haber1 from '../images/haber1.jpg';
import haber2 from '../images/haber2.jpg';
import haber3 from '../images/haber3.jpg';
import haber4 from '../images/haber4.jpg';
import haber5 from '../images/haber5.jpg';
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageBMOL() {
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2024-12-31');
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    mobilePhone: "",
    idNumber: "",
    email: "",
    dateOfBirth: "",
    confirmPassword: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleFetchError = (res) => {
    return res.json().then((json) => {
      if (json.errors && Array.isArray(json.errors)) {
        setErrorMessages([json.errors[0]]);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    }).catch(() => {
      setErrorMessages(["Hata mesajı alınamadı."]);
      setSnackbarOpen(true);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    if (date) {
      setDateOfBirth(date.toISOString().split('T')[0]);
    } else {
      setDateOfBirth('');
    }
  };

  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const sendRegisterRequest = () => {
    const body = {
      idNumber: idNumber,
      lastname: lastname,
      firstname: firstname,
      password: password,
      country: country,
      mobilePhone: mobilePhone,
      dateOfBirth: dateOfBirth,
      email: email,
      confirmPassword: confirmPassword,
      userType: "INDIVIDUAL"
    }


    fetch("auth/register", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          return handleFetchError(res);
        }
        return res.json();
      })
      .then((result) => {
        if (result && result.token) {
          localStorage.setItem("tokenKey", result.token);
          localStorage.setItem("selectedUserId", result.userId);
          localStorage.setItem("userName", idNumber);
          localStorage.setItem("userPassword", password);
          setSuccessMessage("Kullanıcı başarılı bir şekilde kaydedildi");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
          setSnackbarOpen(true)
          navigate("/bireysel-giris");
        }
      });
  };

  const handleRegisterButton = () => {
    setErrorMessages([]);

    const age = calculateAge(startDate);
    if (age < 18) {
      setErrorMessages(["18 yaşından küçük olamazsınız."]);
      return;
    }

    sendRegisterRequest();

    setIdNumber("");
    setFirstname("");
    setLastname("");
    setCountry("");
    setDateOfBirth("");
    setMobilePhone("");
    setEmail("");
    setConfirmPassword("");
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <div
              style={{
                position: 'absolute', top: '150px', left: '250px', width: '650px', height: '675px',
                backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px'
              }}>
              <Typography variant="h4" style={{ position: 'absolute', marginTop: '-15px', marginLeft: '125px', whiteSpace: 'nowrap', color: 'white' }}>
                Bireysel Müşteri Ol
              </Typography>
              <div className="absolute w-[300px]h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '90px', left: '70px', zIndex: 10 }} >
                <MDBInput label="Ad" id="firstname" type="text" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>

              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '90px', left: '355px', zIndex: 10 }} >
                <MDBInput label="Soyad" id="form1" type="soyad" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>

              <div className="absolute w-[210px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '165px', left: '70px', zIndex: 10 }} >
                <MDBInput label="Kimlik No" id="form6" type="KN" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              </div>

              <div className="absolute w-[300px]h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '240px', left: '70px', zIndex: 10 }}>
                <MDBInput label="Cep Telefonu (5XX)" id="form2" type="CT" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
              </div>
              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white  rounded-lg" style={{ top: '165px', left: '355px', zIndex: 1 }} >
                <MDBInput label="E-posta" id="form3" type="EP" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="absolute w-[220px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '315px', left: '65px', zIndex: 10, padding: '5px' }}>
                <MDBInput label="Şifre" id="form7" type="password" className="w-1/2 h-10 mt-0 ml-0 bg-white text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="absolute w-[210px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '380px', left: '70px' }} >
                <MDBInput label="Şifre Onay" id="form5" type="password" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '257px', left: '305px' }}>
                <label style={{ color: 'white' }}>Doğum Tarihi</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  className="form-control"
                  minDate={minDate}
                  maxDate={maxDate}
                  yearDropdownItemNumber={125}
                />
              </div>
              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '225px', left: '355px' }}>
                <label style={{ color: 'white' }}>Ülke</label>
                <CountrySelect
                  value={selectedCountry}
                  onChange={(country) => {
                    setSelectedCountry(country);
                    setCountry(country ? country.name : '');
                  }}


                  classes="form-control"
                />
              </div>

            </div>
            <div style={{ position: 'relative', marginTop: '575px', marginLeft: '-75px' }}>
              <MDBCheckbox
                id='controlledCheckbox'
                label={<span className="text-white">Kişisel Verilerin Korunması Kanunu <br />ve Aydınlatma Metnini Onaylıyorum</span>}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </div>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                position: 'absolute', top: '540px', left: '605px', width: '200px', height: '40px',
                backgroundColor: "#0033a8", color: 'white', '&:hover': { backgroundColor: '#35aaff' }
              }} disabled={!checked} onClick={handleRegisterButton} >
              Kaydol
            </Button>

            {errorMessages.length > 0 && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #f5c6cb',
                marginBottom: '10px',
                position: 'absolute',
                top: '75px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                zIndex: '9000'
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
            <Typography variant="h10" style={{ position: 'absolute', top: '695px', left: '300px', color: 'white', width: '600px' }}>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesinden doğan haklarınıza ve bu konudaki detaylı bilgiye
              <span style={{ display: 'inline-block', width: '5px' }}></span>
              <Link to="/aydınlatma-metni" style={{ color: 'grey', textDecoration: 'underline' }}>aydınlatma metnimizden</Link> ulaşabilirsiniz.
            </Typography>
            <Typography variant="h10" style={{ position: 'absolute', top: '613px', left: '620px', color: 'white', width: '600px' }}>
              TrustEx Müşterisi Misiniz?<br /> Hemen
              <span style={{ display: 'inline-block', width: '5px' }}></span>
              <Link to="/bireysel-giris" style={{ color: 'grey', textDecoration: 'underline' }}>giriş yapın!</Link>
            </Typography>
            <div
              style={{
                position: 'absolute', top: '150px', left: '950px', width: '650px', height: '675px',
                backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px',
              }}>
              <Typography variant="h5" style={{ marginTop: '-30px', marginLeft: '-10px' }}>Günün Haberleri</Typography>
              <a
                href="https://tr.investing.com/news/forex-news/tcmb-rezervleri-24-milyar-dolar-artt-2989165"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ marginTop: '10px', marginLeft: '120px' }}
                >
                  TCMB rezervleri 2,4 milyar dolar arttı!
                </MDBBtn>
                <img
                  src={haber1}
                  alt="Örnek Resim"
                  style={{
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '-30px',
                  }}
                />
              </a>
              <a
                href="https://tr.investing.com/news/forex-news/kkm-ve-katlma-hesaplar-677-milyar-tl-geriledi-2989085"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ marginTop: '20px', marginLeft: '120px' }}
                >
                  KKM ve katılma hesapları 67,7 milyar TL geriledi
                </MDBBtn>
                <img
                  src={haber2}
                  alt="Örnek Resim 1"
                  style={{
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '-20px',
                  }}
                />
              </a>

              <a
                href="https://tr.investing.com/news/forex-news/citiye-gore-dolaryen-paritesi-daha-da-dusebilir-2987079"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ marginTop: '20px', marginLeft: '120px' }}
                >
                  Citi’ye göre dolar/yen paritesi daha da düşebilir
                </MDBBtn>
                <img
                  src={haber3}
                  alt="Örnek Resim 2"
                  style={{
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '-30px',
                  }}
                />
              </a>

              <a
                href="https://tr.investing.com/news/economy-news/cinin-doviz-rezervleri-zayf-dolardan-kaynaklanan-degerlemeyle-yukseldi-2985851"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: "absolute", marginTop: '70px', marginLeft: '120px' }}
                >
                  Çin'in döviz rezervleri zayıf dolardan <br />kaynaklanan değerlemeyle yükseldi
                </MDBBtn>
                <img
                  src={haber4}
                  alt="Örnek Resim 3"
                  style={{
                    position: "absolute",
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '70px',
                  }}
                />
              </a>

              <a
                href="https://tr.investing.com/news/forex-news/abd-dolar-son-dususun-ardndan-toparlanmaya-hazrlanyor-93CH-2984754"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: "absolute", marginTop: '200px', marginLeft: '120px' }}
                >
                  ABD doları son düşüşün ardından<br /> toparlanmaya hazırlanıyor
                </MDBBtn>
                <img
                  src={haber5}
                  alt="Örnek Resim 4"
                  style={{
                    position: "absolute",
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '200px',
                  }}
                />
              </a>

            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}