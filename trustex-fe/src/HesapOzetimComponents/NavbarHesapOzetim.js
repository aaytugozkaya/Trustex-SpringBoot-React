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

function NavbarHesapOzetim() {
  const [openNavColor, setOpenNavColor] = useState(false);
  const navigate = useNavigate();
const userType = localStorage.getItem('userType');
  const handlegirisClick = () => {
    userType === 'INDIVIDUAL' ? navigate('/hesap-ozetim') :
    navigate('/personel-ana-sayfa');
  };


  const handleprofilClick = () => {
    navigate('/profil-birey');
  };

  return (
    <MDBNavbar expand='lg' dark style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: '#031a55' }}>
      <MDBContainer fluid>
        <img
          src={logo}
          alt="Logo"
          style={{ height: '50px', marginLeft: '0px', cursor: 'pointer' }}
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
            <MDBNavbarItem style={{ position: 'absolute', top: '12px', left: '200px' }}>
              <MDBNavbarLink onClick={handlegirisClick} style={{ color: 'white' }}>
                Ana Sayfa
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ position: 'absolute', top: '12px', left: '1800px' }}>
              <MDBNavbarLink onClick={handleprofilClick} style={{ color: 'white' }}>
                Profil
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavbarHesapOzetim;
