import React, { useState, useEffect } from 'react';
import AssetsCard from './AssetsCard';
import './AssetsPageScreen.css';
import { PieChart } from '@mui/x-charts/PieChart';
import CustomButton from './CustomButton';
import { fetchUserAssetsInTL } from './api';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundsp.jpg';

function AssetsPageScreen() {
  const [totalAssetsValue, setTotalAssetsValue] = useState(0);
  const [assets, setAssets] = useState([]);
  const userId = localStorage.getItem('selectedUserId');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const customerNumber = localStorage.getItem('selectedCustomerNumber');
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchUserAssetsInTL(userId);
        setAssets(data);

        const totalValue = data.reduce((total, asset) => total + asset.valueInTL, 0);
        setTotalAssetsValue(totalValue);
      } catch (error) {
        console.error('Varlıklar yüklenirken hata:', error);
      }
    };

    loadAssets();
  }, [userId]);

  const filteredData = assets.filter(asset =>
    asset.currencyLabelTR.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlealsatClick = () => {
    navigate('/al-sat');
  };
  const handlegecmisClick = () => {
    navigate('/gecmis-islemlerim');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }} className="assets-page-container">


      <div className="customer-info">
        <span>Müşteri No: {customerNumber}</span>
      </div>

      <div className="body-container">
        <div className="left-panel">
          <h3>Hesap Detay Dökümü</h3>
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
            width={350}
            height={350}
            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
          />

          <div className="balance-info">
            <div className="balance-item">
              <h4>TL Bakiye:</h4>
              <span>{totalAssetsValue.toFixed(2)} TL</span>
            </div>
          </div>
        </div>

        <div className='right-panel' style={styles.rightPanel}>
          <h2>Detay</h2>

          <div className="search-container">
            <input
              type="text"
              placeholder="Döviz Ara..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="cards-wrapper">
            {currentData.map((asset, index) => (
              <AssetsCard
                key={index}
                title={asset.currencyLabelTR}
                totalValue={asset.valueInTL}
                quantity={asset.amount}
                cost={asset.avgCost}
                lastPrice={asset.lastPrice}
                totalAssetsValue={totalAssetsValue}
              />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <span>{`Sayfa ${currentPage} / ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>

          <div className='button-div'>
            <CustomButton onClick={handlegecmisClick} text='Geçmiş İşlemlerim' />
            <CustomButton onClick={handlealsatClick} text='Döviz Al/Sat' />
            <CustomButton text='Destek' />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  rightPanel: {
    flex: 3,
    padding: '20px',
    marginLeft: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default AssetsPageScreen;