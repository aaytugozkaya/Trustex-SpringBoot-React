import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';
import haber1 from '../images/haber1.jpg';
import haber2 from '../images/haber2.jpg';
import haber3 from '../images/haber3.jpg';
import haber4 from '../images/haber4.jpg';
import haber5 from '../images/haber5.jpg';
import haber6 from '../images/haber6.jpg';
import haber7 from '../images/haber7.png';
import haber8 from '../images/haber8.jpg';
import haber9 from '../images/haber9.jpg';
import haber10 from '../images/haber10.jpg';
import backgroundImage from '../images/backgroundsp.jpg';

export default function MainPageHaberveDoviz() {
  return (
    <div className="custom-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <div
              style={{
                position: 'absolute',
                top: '180px',
                left: '35px',
                width: '1000px',
                height: '600px',
                backgroundColor: '#062065',
                color: 'white',
                padding: '50px',
                borderRadius: '4px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 1)'
              }}
            >
              <Typography
                variant="h4"
                style={{ marginTop: '-30px', marginLeft: '-10px' }}
              >
                HABERLER
              </Typography>

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
                  style={{ marginTop: '10px', marginLeft: '120px' }}
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
                    marginTop: '-30px',
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
                  style={{ marginTop: '10px', marginLeft: '120px' }}
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
                  style={{ marginTop: '10px', marginLeft: '120px' }}
                >
                  Çin'in döviz rezervleri zayıf dolardan <br />kaynaklanan değerlemeyle yükseldi
                </MDBBtn>
                <img
                  src={haber4}
                  alt="Örnek Resim 3"
                  style={{
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '-30px',
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
                  style={{ marginTop: '10px', marginLeft: '120px' }}
                >
                  ABD doları son düşüşün ardından<br /> toparlanmaya hazırlanıyor
                </MDBBtn>
                <img
                  src={haber5}
                  alt="Örnek Resim 4"
                  style={{
                    width: '100px',
                    height: '75px',
                    marginLeft: '-10px',
                    marginTop: '-30px',
                  }}
                />
              </a>
              <a
                href="https://www.gazeteduvar.com.tr/bofa-analisti-yanitladi-dolartlde-sicrama-olur-mu-galeri-1710973"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: 'absolute', marginTop: '-490px', marginLeft: '675px' }}
                >
                  Dolar/TL'de sıçrama olur mu?
                </MDBBtn>
                <img
                  src={haber6}
                  alt="Örnek Resim 5"
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '75px',
                    marginLeft: '550px',
                    marginTop: '-490px',
                  }}
                />
              </a>
              <a
                href="https://haber.doviz.com/doviz-haberleri/doviz-kredileri-ilave-tedbirlere-ragmen-yukselisini-surdurdu/742275"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: 'absolute', marginTop: '-400px', marginLeft: '675px' }}
                >
                  Döviz kredileri ilave tedbirlere rağmen yükselişini sürdürdü
                </MDBBtn>
                <img
                  src={haber7}
                  alt="Örnek Resim 6"
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '75px',
                    marginLeft: '550px',
                    marginTop: '-400px',
                  }}
                />
              </a>
              <a
                href="https://www.doviz.com/yorum/secim-sonuclarinin-doviz-kurlari-uzerindeki-etkisi/739062"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: 'absolute', marginTop: '-300px', marginLeft: '675px' }}
                >
                  Seçim sonuçlarının döviz kurları üzerindeki etkisi
                </MDBBtn>
                <img
                  src={haber8}
                  alt="Örnek Resim 7"
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '75px',
                    marginLeft: '550px',
                    marginTop: '-300px',
                  }}
                />
              </a>
              <a
                href="https://haber.doviz.com/doviz-haberleri/merkez-bankasi-ilk-kez-reeskont-araciligiyla-doviz-alimi-yapmadi/741992"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: 'absolute', marginTop: '-200px', marginLeft: '675px' }}
                >
                  Merkez Bankası ilk kez reeskont aracılığıyla döviz alımı yapmadı
                </MDBBtn>
                <img
                  src={haber9}
                  alt="Örnek Resim 8"
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '75px',
                    marginLeft: '550px',
                    marginTop: '-200px',
                  }}
                />
              </a>
              <a
                href="https://haber.doviz.com/doviz-haberleri/serbest-piyasada-doviz-acilis-fiyatlari-9-agustos-2024/742185"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <MDBBtn
                  color="link"
                  rippleColor="light"
                  style={{ position: 'absolute', marginTop: '-90px', marginLeft: '675px' }}
                >
                  Serbest piyasada döviz açılış fiyatları
                </MDBBtn>
                <img
                  src={haber10}
                  alt="Örnek Resim 9"
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '75px',
                    marginLeft: '550px',
                    marginTop: '-90px',
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
