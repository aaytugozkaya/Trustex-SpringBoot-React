const API_BASE_URL = 'api/v1';

const getToken = () => localStorage.getItem('token');
const getUserId = () => localStorage.getItem('selectedUserId');


export const fetchTransactions = async (userId) => {


    const response = await fetch(`${API_BASE_URL}/users/${userId}/balance-transactions`, {
        headers: {

            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
    });
    if (!response.ok) {
        throw new Error('İşlem verileri alınamadı.');
    }
    const data = await response.json();
    return data;
};


export const fetchUserSentTransfers = async (userId) => {


    const response = await fetch(`${API_BASE_URL}/transfers/user/${userId}/sent`, {
        headers: {

            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
    });
    if (!response.ok) {
        throw new Error('Transfer verileri alınamadı.');
    }
    const data = await response.json();
    return data;
};

export const postTransfer = async (transferData) => {

    const response = await fetch(`${API_BASE_URL}/transfers`, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(transferData),
    });

    if (!response.ok) {
        throw new Error('Transfer gerçekleştirilemedi');
    }

    return await response.json();
};

export const addMoney = async (amount, currencyCode) => {
  
    const userId = getUserId();

    const response = await fetch(`${API_BASE_URL}/users/${userId}/add-money`, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({ amount, currencyCode }),
    });

    if (!response.ok) {
        throw new Error('Para yatırma işlemi başarısız oldu.');
    }

    return await response.json();
};

export const withdrawMoney = async (amount, currencyCode, iban, swiftCode) => {
    
    const userId = getUserId();

    const response = await fetch(`${API_BASE_URL}/users/${userId}/withdraw-money`, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json', "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({ amount, currencyCode, iban, swiftCode }),
    });

    if (!response.ok) {
        throw new Error('Para çekme işlemi başarısız oldu.');
    }

    return await response.json();
};
