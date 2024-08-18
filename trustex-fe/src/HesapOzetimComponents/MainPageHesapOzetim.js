import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageProfilBirey() {
  const navigate = useNavigate();
  const [totalAssetsValue, setTotalAssetsValue] = useState(0);
  const [customerNumber, setCustomerNumber] = useState(localStorage.getItem('selectedCustomerNumber'));
  const [assets, setAssets] = useState([]);
  const userId = localStorage.getItem('selectedUserId');
  const currentUser = localStorage.getItem('currentUser');


  const handlealsatClick = () => {
    navigate('/al-sat');
  };

  const handlehabervedovizClick = () => {
    navigate('/haber-doviz');
  };

  const handlecaprazClick = () => {
    navigate('/capraz-islem');
  };

  const handledetayClick = () => {
    navigate('/hesap-detay');
  };

  const handleyatırClick = () => {
    navigate('/yatır-çek-transfer');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/v1/assets/user/${userId}/tl`, { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        const data = await response.json();

        const totalValue = data.reduce((total, asset) => total + asset.valueInTL, 0);
        setTotalAssetsValue(totalValue);
        setAssets(data);

        const userResponse = await fetch(`profile/${userId}`, { headers: { "Authorization": localStorage.getItem("tokenKey") } });
        const userData = await userResponse.json();
        setCustomerNumber(userData.customerNumber);
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '102.6vh' }}>
      <Container>
        <Grid container spacing={3} style={{ position: 'relative' }}>
          <Grid item xs={12} style={{ position: 'absolute' }}>
            <PieChart
              series={[
                {
                  data: assets.map(asset => ({
                    id: asset.id,
                    value: asset.valueInTL,
                    label: asset.currencyLabelTR
                  })),
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                },
              ]}
              width={400}
              height={400}
              style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', position: 'absolute', top: '300px', left: '600px' }}
            />
            <div style={{ position: 'absolute', top: '250px', left: '1000px', width: '400px', height: '500px', backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}>
              <Typography variant="h4" style={{ marginTop: '-20px', marginLeft: '90px', color: 'white' }}>
                İşlemler
              </Typography>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', width: '300px', top: '100px', left: '55px', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handlealsatClick}
              >
                Döviz Al/Sat
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', width: '300px', top: '180px', left: '55px', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handledetayClick}
              >
                Hesap Detay Dökümü
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', width: '300px', top: '260px', left: '55px', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handlecaprazClick}
              >
                Çapraz İşlem
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', width: '300px', top: '340px', left: '55px', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handleyatırClick}
              >
                Para Yatır & Çek & Aktar
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ position: 'absolute', width: '300px', top: '420px', left: '55px', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#b8dfff' } }}
                onClick={handlehabervedovizClick}
              >
                Kur Gözlem & Döviz Haberleri
              </Button>
              <div style={{ position: 'absolute', top: '-150px', left: '-1280px', width: '800px', height: '825px', backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}>
                <Typography variant="h4" style={{ marginTop: '-20px', marginLeft: '230px', color: 'white' }}>
                  Hesap Özetim
                </Typography>
                <Typography variant="h4" style={{ marginTop: '685px', marginLeft: '-10px', color: 'white' }}>
                  TRY Bakiye
                </Typography>
                <Typography variant="body1" sx={{
                  color: 'black',
                  mb: 2,
                  padding: '10px',
                  backgroundColor: 'white',
                  width: '200px',
                  height: '50px',
                  textAlign: 'center',
                  margin: '0 auto',
                  position: 'relative',
                  top: '-45px',
                  left: '-50px'
                }}>
                  {totalAssetsValue.toFixed(2)} TL
                </Typography>
                <Typography variant="h6" style={{ position: 'absolute', bottom: '780px', marginLeft: '-25px', color: 'white' }}>
                  Müşteri Numarası
                </Typography>
                <Typography variant="body1" sx={{
                  color: 'black',
                  mb: 2,
                  padding: '10px',
                  backgroundColor: 'white',
                  width: '150px',
                  height: '40px',
                  textAlign: 'center',
                  margin: '0 auto',
                  position: 'absolute',
                  top: '50px',
                  left: '30px'
                }}>
                  {localStorage.getItem('selectedCustomerNumber')}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}