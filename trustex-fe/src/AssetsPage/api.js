const API_BASE_URL = 'api/v1';

export const fetchUserAssetsInTL = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/assets/user/${userId}/tl`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey")
        }
    });
    if (!response.ok) {
        throw new Error('Varlık verileri alınamadı.');
    }
    return await response.json();
};

export const fetchExchangeRates = async () => {
    const response = await fetch(`${API_BASE_URL}/exchange-rates/currency`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey")
        }
    });
    if (!response.ok) {
        throw new Error('Döviz kurları alınamadı.');
    }
    const data = await response.json();
    return data;
};
