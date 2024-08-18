import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBInput, MDBValidation, MDBValidationItem, MDBTypography } from 'mdb-react-ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';

export default function MainPagePersonelAna() {
  const [searchText, setSearchText] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllCustomers = async () => {
      const token = localStorage.getItem("tokenKey"); 
      

      try {   
        const personnelId =localStorage.getItem("currentUser")
      

        const response = await fetch(`api/v1/personnel-customers/${personnelId}/customer?search=`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Tüm kullanıcıları alırken bir hata oluştu.');
        }

        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
        setError(null);
      } catch (err) {
        setCustomers([]);
        setFilteredCustomers([]);
        setError(err.message);
      }
    };

    fetchAllCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const personnelId = localStorage.getItem("currentUser"); 

    try {
      const response = await fetch(`api/v1/personnel-customers/${personnelId}/customer?search=${searchText}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Müşteri bulunamadı veya bir hata oluştu.');
      }

      const data = await response.json();
      setFilteredCustomers(data); 
      setError(null);
    } catch (err) {
      setFilteredCustomers([]);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCustomerClick = (customerNumber,selectedUserId) => {
    localStorage.setItem('selectedCustomerNumber', customerNumber); 
    localStorage.setItem("selectedUserId", selectedUserId)
    alert(`Seçilen müşteri numarası: ${customerNumber}`);
    navigate("/hesap-ozetim")
  };

  return (
    <MDBContainer style={{ marginTop: '75px' }}>
      <h2>Müşteri Ara</h2>
      <form onSubmit={handleSubmit}>
        <MDBInput
          name="search"
          label='Arama'
          value={searchText}
          onChange={handleChange}
          placeholder="Ad, Soyad veya Müşteri No girin"
        />
        <MDBInput
          type="submit"
          value="Ara"
          className="mt-3"
        />
      </form>
      {error && (
        <MDBValidation>
          <MDBValidationItem className="mb-3">
            <MDBTypography tag="div" color="danger">
              {error}
            </MDBTypography>
          </MDBValidationItem>
        </MDBValidation>
      )}
      {filteredCustomers.length > 0 ? (
        <div>
          <h3>Müşteri Bilgileri</h3>
          {filteredCustomers.map(customer => (
            <div key={customer.customerNumber}>
              <p>Ad: {customer.firstname}</p>
              <p>Soyad: {customer.lastname}</p>
              <p>Müşteri No: {customer.customerNumber}</p>
              <button onClick={() => handleCustomerClick(customer.customerNumber,customer.selectedUserId)}>
                Seç
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Henüz müşteri bulunamadı.</p>
        </div>
      )}
    </MDBContainer>
  );
}