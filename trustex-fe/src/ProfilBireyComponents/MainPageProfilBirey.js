import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { MDBInput } from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountrySelect from "react-bootstrap-country-select";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageProfilBirey() {
  const mockProfile = {
    firstname: "Lütfen Giriş Yapınız",
    lastname: "Lütfen Giriş Yapınız",
    country: "Lütfen Giriş Yapınız",
    mobilePhone: "Lütfen Giriş Yapınız",
    idNumber: "Lütfen Giriş Yapınız",
    email: "Lütfen Giriş Yapınız",
    dateOfBirth: new Date("1990-01-01"),
    selectedCountry: { value: "TR", label: "Turkey" },
  };

  const [isEditable, setIsEditable] = useState(false);
  const [startDate, setStartDate] = useState(mockProfile.dateOfBirth);
  const [selectedCountry, setSelectedCountry] = useState(mockProfile.selectedCountry);
  const [firstname, setFirstname] = useState(mockProfile.firstname);
  const [lastname, setLastname] = useState(mockProfile.lastname);
  const [country, setCountry] = useState(mockProfile.country);
  const [mobilePhone, setMobilePhone] = useState(mockProfile.mobilePhone);
  const [idNumber, setIdNumber] = useState(mockProfile.idNumber);
  const [email, setEmail] = useState(mockProfile.email);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("selectedUserId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFirstname(data.firstname || mockProfile.firstname);
        setLastname(data.lastname || mockProfile.lastname);
        setCountry(data.country || mockProfile.country);
        setMobilePhone(data.mobilePhone || mockProfile.mobilePhone);
        setIdNumber(data.idNumber || mockProfile.idNumber);
        setEmail(data.email || mockProfile.email);

        const dateOfBirth = data.dateOfBirth
          ? new Date(data.dateOfBirth)
          : mockProfile.dateOfBirth;
        setStartDate(dateOfBirth);

        const selectedCountry = data.country
          ? { value: data.country, label: data.country }
          : mockProfile.selectedCountry;
        setSelectedCountry(selectedCountry);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setFirstname(mockProfile.firstname);
        setLastname(mockProfile.lastname);
        setCountry(mockProfile.country);
        setMobilePhone(mockProfile.mobilePhone);
        setIdNumber(mockProfile.idNumber);
        setEmail(mockProfile.email);
        setStartDate(mockProfile.dateOfBirth);
        setSelectedCountry(mockProfile.selectedCountry);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

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

  const saveProfile = async () => {
    try {
      const profileData = {
        id: localStorage.getItem("currentUser"),
        firstname,
        lastname,
        country: selectedCountry?.label || country,
        mobilePhone,
        idNumber,
        email,
        userType: "INDIVIDUAL",
        dateOfBirth: startDate ? startDate.toISOString().split("T")[0] : null,
        selectedCountry: selectedCountry?.value || null,
      };

      console.log("Profile Data being sent:", profileData);

      const response = await fetch("/profile/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Profile saved successfully:", result);
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleSaveClick = () => {
    saveProfile();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '102.6vh' }}>
      <Container>
        <Grid container spacing={3} style={{ position: "relative" }}>
          <Grid item xs={12} style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "600px",
                height: "750px",
                backgroundColor: "#031a55",
                color: "white",
                padding: "50px",
                borderRadius: "4px",
                margin: "0 auto",
                marginTop: "120px",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  color: "white",
                  marginBottom: "30px",
                }}
              >
                Profilim
              </Typography>

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Ad
              </Typography>
              <MDBInput
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: "10px" }}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Soyad
              </Typography>
              <MDBInput
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: "10px" }}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Kimlik No
              </Typography>
              <MDBInput
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: "10px" }}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Telefon No
              </Typography>
              <MDBInput
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: "10px" }}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                E-Posta
              </Typography>
              <MDBInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: "10px" }}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Doğum Tarihi
              </Typography>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
                showYearDropdown
                scrollableYearDropdown
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                disabled={!isEditable}
              />

              <Typography
                variant="subtitle1"
                style={{ color: "white", marginBottom: "5px" }}
              >
                Ülke  ({country})
              </Typography>
              <CountrySelect
                value={selectedCountry}
                onChange={(country) => {
                  if (country) {
                    console.log("Selected country:", country);
                    setSelectedCountry(country);
                    setCountry(country.name);
                  } else {
                    console.log("Country selection cleared");
                    setSelectedCountry(null);
                    setCountry("");
                  }
                }}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                disabled={!isEditable}
              />

              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: "#0033a8",
                  top: "30px",
                  color: "white",
                  "&:hover": { backgroundColor: "#35aaff" },
                }}
                onClick={isEditable ? handleSaveClick : handleEditClick}
                style={{ marginRight: "10px" }}
              >
                {isEditable ? "Kaydet" : "Düzenle"}
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: "#35aaff",
                  top: "30px",
                  color: "white",
                  "&:hover": { backgroundColor: "#b8dfff" },
                }}
                onClick={handlesifreClick}
                style={{ marginRight: "10px" }}
              >
                Şifre Değiştir
              </Button>

              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: "#e40014",
                  top: "30px",
                  color: "white",
                  "&:hover": { backgroundColor: "#ff8d97" },
                }}
                onClick={handleçıkışClick}
              >
                Çıkış Yap
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}