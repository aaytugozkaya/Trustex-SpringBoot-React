import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function NavbarSifreMerkezi() {
  const [openNavColor, setOpenNavColor] = useState(false);
  const navigate = useNavigate();

  const handlegirisClick = () => {
    navigate('/bireysel-giris');
  };

  const handleBMOLClick = () => {
    navigate('/bireysel-musteri-ol');
  };
  const handleLogoClick = () => {
    navigate('/');
  };
  const handlesifre2Click = () => {
    navigate('/sifre-merkezi');
  };

  return (
    <MDBNavbar expand='lg' dark style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: '#031a55' }}>
      <MDBContainer fluid>
        <img
          src={logo}
          alt="Logo"
          style={{ height: '50px', marginLeft: '575px', cursor: 'pointer' }}
          onClick={handleLogoClick}
        />
        <MDBNavbarToggler
          type='button'
          aria-controls='navbarColor01'
          aria-expanded={openNavColor}
          aria-label='Toggle navigation'
          onClick={() => setOpenNavColor(!openNavColor)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse open={openNavColor} navbar id='navbarColor01'>
          <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
            <MDBNavbarItem style={{ position: 'absolute', top: '12px', left: '750px' }}>
              <MDBNavbarLink onClick={handlegirisClick} style={{ color: 'white' }}>
                Giriş Yap/Şifre Oluştur
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ position: 'absolute', top: '12px', left: '950px' }}>
              <MDBNavbarLink onClick={handleBMOLClick} style={{ color: 'white' }}>
                Bireysel Müşteri Ol
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ position: 'absolute', top: '12px', left: '1125px' }}>
              <MDBNavbarLink onClick={handlesifre2Click} style={{ color: 'white' }}>
                Şifre Merkezi
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavbarSifreMerkezi;
