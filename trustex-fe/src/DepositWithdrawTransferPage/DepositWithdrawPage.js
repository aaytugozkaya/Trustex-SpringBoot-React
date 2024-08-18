import React, { useState, useEffect } from 'react';
import './DepositWithdrawPage.css';
import { fetchTransactions, fetchUserSentTransfers, postTransfer, addMoney, withdrawMoney } from './api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import garanti from '../images/garanti.png';
import backgroundImage from '../images/backgroundsp.jpg';

function DepositWithdrawPage() {
    const [isDeposit, setIsDeposit] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedTransferCurrency, setSelectedTransferCurrency] = useState('');
    const [depositIban, setDepositIban] = useState('');
    const [withdrawIban, setWithdrawIban] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [recipientCustomerNo, setRecipientCustomerNo] = useState('');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const userId = localStorage.getItem('selectedUserId');

    const currencyOptions = [
        { label: 'BAE Dirhemi', value: 'AED' },
        { label: 'Afganistan Afganisi', value: 'AFN' },
        { label: 'Arnavut Leki', value: 'ALL' },
        { label: 'Ermeni Dramı', value: 'AMD' },
        { label: 'Hollanda Antilleri Guldeni', value: 'ANG' },
        { label: 'Angola Kvanzası', value: 'AOA' },
        { label: 'Arjantin Pezosu', value: 'ARS' },
        { label: 'Avustralya Doları', value: 'AUD' },
        { label: 'Aruba Florini', value: 'AWG' },
        { label: 'Azerbaycan Manatı', value: 'AZN' },
        { label: 'Bosna-Hersek Markı', value: 'BAM' },
        { label: 'Barbados Doları', value: 'BBD' },
        { label: 'Bangladeş Takası', value: 'BDT' },
        { label: 'Bulgar Levası', value: 'BGN' },
        { label: 'Bahreyn Dinarı', value: 'BHD' },
        { label: 'Burundi Frangı', value: 'BIF' },
        { label: 'Bermuda Doları', value: 'BMD' },
        { label: 'Brunei Doları', value: 'BND' },
        { label: 'Bolivya Bolivyanosu', value: 'BOB' },
        { label: 'Brezilya Reali', value: 'BRL' },
        { label: 'Bahamalar Doları', value: 'BSD' },
        { label: 'Butan Ngultrumu', value: 'BTN' },
        { label: 'Botsvana Pulası', value: 'BWP' },
        { label: 'Beyaz Rusya Rublesi', value: 'BYN' },
        { label: 'Belize Doları', value: 'BZD' },
        { label: 'Kanada Doları', value: 'CAD' },
        { label: 'Kongo Frangı', value: 'CDF' },
        { label: 'İsviçre Frangı', value: 'CHF' },
        { label: 'Şili Pezosu', value: 'CLP' },
        { label: 'Çin Yuanı', value: 'CNY' },
        { label: 'Kolombiya Pezosu', value: 'COP' },
        { label: 'Kosta Rika Kolonu', value: 'CRC' },
        { label: 'Küba Pezosu', value: 'CUP' },
        { label: 'Cape Verde Eskudosu', value: 'CVE' },
        { label: 'Çek Korunası', value: 'CZK' },
        { label: 'Cibuti Frangı', value: 'DJF' },
        { label: 'Danimarka Kronu', value: 'DKK' },
        { label: 'Dominik Pezosu', value: 'DOP' },
        { label: 'Cezayir Dinarı', value: 'DZD' },
        { label: 'Mısır Poundu', value: 'EGP' },
        { label: 'Eritre Nakfası', value: 'ERN' },
        { label: 'Etiyopya Birri', value: 'ETB' },
        { label: 'Euro', value: 'EUR' },
        { label: 'Fiji Doları', value: 'FJD' },
        { label: 'Falkland Adaları Poundu', value: 'FKP' },
        { label: 'Faroe Adaları Kronu', value: 'FOK' },
        { label: 'İngiliz Sterlini', value: 'GBP' },
        { label: 'Gürcistan Larisi', value: 'GEL' },
        { label: 'Guernsey Poundu', value: 'GGP' },
        { label: 'Gana Sedisi', value: 'GHS' },
        { label: 'Cebelitarık Poundu', value: 'GIP' },
        { label: 'Gambiya Dalasisi', value: 'GMD' },
        { label: 'Gine Frangı', value: 'GNF' },
        { label: 'Guatemala Quetzalı', value: 'GTQ' },
        { label: 'Guyana Doları', value: 'GYD' },
        { label: 'Hong Kong Doları', value: 'HKD' },
        { label: 'Honduras Lempirası', value: 'HNL' },
        { label: 'Hırvat Kunası', value: 'HRK' },
        { label: 'Haiti Gourdesi', value: 'HTG' },
        { label: 'Macar Forinti', value: 'HUF' },
        { label: 'Endonezya Rupisi', value: 'IDR' },
        { label: 'İsrail Şekeli', value: 'ILS' },
        { label: 'Man Adası Poundu', value: 'IMP' },
        { label: 'Hindistan Rupisi', value: 'INR' },
        { label: 'Irak Dinarı', value: 'IQD' },
        { label: 'İran Riyali', value: 'IRR' },
        { label: 'İzlanda Kronu', value: 'ISK' },
        { label: 'Jersey Poundu', value: 'JEP' },
        { label: 'Jamaika Doları', value: 'JMD' },
        { label: 'Ürdün Dinarı', value: 'JOD' },
        { label: 'Japon Yeni', value: 'JPY' },
        { label: 'Kenya Şilini', value: 'KES' },
        { label: 'Kırgız Somu', value: 'KGS' },
        { label: 'Kamboçya Rieli', value: 'KHR' },
        { label: 'Kiribati Doları', value: 'KID' },
        { label: 'Komor Frangı', value: 'KMF' },
        { label: 'Güney Kore Wonu', value: 'KRW' },
        { label: 'Kuveyt Dinarı', value: 'KWD' },
        { label: 'Cayman Adaları Doları', value: 'KYD' },
        { label: 'Kazak Tengesi', value: 'KZT' },
        { label: 'Laos Kipi', value: 'LAK' },
        { label: 'Lübnan Poundu', value: 'LBP' },
        { label: 'Sri Lanka Rupisi', value: 'LKR' },
        { label: 'Liberya Doları', value: 'LRD' },
        { label: 'Lesotho Lotisi', value: 'LSL' },
        { label: 'Libya Dinarı', value: 'LYD' },
        { label: 'Fas Dirhemi', value: 'MAD' },
        { label: 'Moldova Leyi', value: 'MDL' },
        { label: 'Madagaskar Ariary', value: 'MGA' },
        { label: 'Makedonya Denarı', value: 'MKD' },
        { label: 'Myanmar Kyatı', value: 'MMK' },
        { label: 'Moğolistan Tugriki', value: 'MNT' },
        { label: 'Makao Patakası', value: 'MOP' },
        { label: 'Moritanya Ugiyası', value: 'MRU' },
        { label: 'Mauritius Rupisi', value: 'MUR' },
        { label: 'Maldiv Rufiyası', value: 'MVR' },
        { label: 'Malavi Kvaçası', value: 'MWK' },
        { label: 'Meksika Pezosu', value: 'MXN' },
        { label: 'Malezya Ringgiti', value: 'MYR' },
        { label: 'Mozambik Metikali', value: 'MZN' },
        { label: 'Namibya Doları', value: 'NAD' },
        { label: 'Nijerya Nairası', value: 'NGN' },
        { label: 'Nikaragua Kordobası', value: 'NIO' },
        { label: 'Norveç Kronu', value: 'NOK' },
        { label: 'Nepal Rupisi', value: 'NPR' },
        { label: 'Yeni Zelanda Doları', value: 'NZD' },
        { label: 'Umman Riyali', value: 'OMR' },
        { label: 'Panama Balboası', value: 'PAB' },
        { label: 'Peru Yeni Solu', value: 'PEN' },
        { label: 'Papua Yeni Gine Kinasi', value: 'PGK' },
        { label: 'Filipinler Pezosu', value: 'PHP' },
        { label: 'Pakistan Rupisi', value: 'PKR' },
        { label: 'Polonya Zlotisi', value: 'PLN' },
        { label: 'Paraguay Guaranisi', value: 'PYG' },
        { label: 'Katar Riyali', value: 'QAR' },
        { label: 'Romanya Leyi', value: 'RON' },
        { label: 'Sırp Dinarı', value: 'RSD' },
        { label: 'Rus Rublesi', value: 'RUB' },
        { label: 'Ruanda Frangı', value: 'RWF' },
        { label: 'Suudi Riyal', value: 'SAR' },
        { label: 'Solomon Adaları Doları', value: 'SBD' },
        { label: 'Seyşeller Rupisi', value: 'SCR' },
        { label: 'Sudan Poundu', value: 'SDG' },
        { label: 'İsveç Kronu', value: 'SEK' },
        { label: 'Singapur Doları', value: 'SGD' },
        { label: 'Saint Helena Poundu', value: 'SHP' },
        { label: 'Sierra Leone Leonası', value: 'SLL' },
        { label: 'Somali Şilini', value: 'SOS' },
        { label: 'Surinam Doları', value: 'SRD' },
        { label: 'Güney Sudan Poundu', value: 'SSP' },
        { label: 'São Tomé ve Príncipe Dobra', value: 'STN' },
        { label: 'Suriye Poundu', value: 'SYP' },
        { label: 'Svaziland Lilangeni', value: 'SZL' },
        { label: 'Tayland Bahtı', value: 'THB' },
        { label: 'Tacik Somonisi', value: 'TJS' },
        { label: 'Türkmenistan Manatı', value: 'TMT' },
        { label: 'Tunus Dinarı', value: 'TND' },
        { label: 'Tonga Paʻanga', value: 'TOP' },
        { label: 'Türk Lirası', value: 'TRY' },
        { label: 'Trinidad ve Tobago Doları', value: 'TTD' },
        { label: 'Tuvalu Doları', value: 'TVD' },
        { label: 'Tanzanya Şilini', value: 'TZS' },
        { label: 'Ukrayna Grivnası', value: 'UAH' },
        { label: 'Uganda Şilini', value: 'UGX' },
        { label: 'Amerikan Doları', value: 'USD' },
        { label: 'Uruguay Pezosu', value: 'UYU' },
        { label: 'Özbek Somu', value: 'UZS' },
        { label: 'Venezuela Bolivarı', value: 'VES' },
        { label: 'Vietnam Dongu', value: 'VND' },
        { label: 'Vanuatu Vatusu', value: 'VUV' },
        { label: 'Samoa Talası', value: 'WST' },
        { label: 'Orta Afrika CFA Frangı', value: 'XAF' },
        { label: 'Gümüş Ons', value: 'XAG' },
        { label: 'Altın Ons', value: 'XAU' },
        { label: 'Doğu Karayip Doları', value: 'XCD' },
        { label: 'Özel Çekim Hakları', value: 'XDR' },
        { label: 'Batı Afrika CFA Frangı', value: 'XOF' },
        { label: 'CFP Frangı', value: 'XPF' },
        { label: 'Yemen Riyali', value: 'YER' },
        { label: 'Güney Afrika Randı', value: 'ZAR' },
        { label: 'Zambiya Kvaçası', value: 'ZMW' },
        { label: 'Zimbabve Doları', value: 'ZWL' }
    ];

    const generateRandomIban = () => {
        let iban = 'TR';
        for (let i = 0; i < 24; i++) {
            iban += Math.floor(Math.random() * 10);
        }
        return iban;
    };

    const ibanList = {
        TRY: generateRandomIban(),
        USD: generateRandomIban(),
        EUR: generateRandomIban(),
        GBP: generateRandomIban(),
        JPY: generateRandomIban(),
        CHF: generateRandomIban(),
        AUD: generateRandomIban(),
        CAD: generateRandomIban(),
        CNY: generateRandomIban(),
        DKK: generateRandomIban(),
        NOK: generateRandomIban(),
        RON: generateRandomIban(),
        SAR: generateRandomIban(),
        SEK: generateRandomIban(),
    };

    useEffect(() => {
        if (selectedCurrency) {
            setDepositIban(ibanList[selectedCurrency]);
        }
    }, [selectedCurrency]);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const transactionData = await fetchTransactions(userId);
                setTransactions(transactionData.reverse());
            } catch (error) {
                console.error('Veriler yüklenirken hata oluştu:', error);
            }
        };

        loadTransactions();
    }, [userId]);

    useEffect(() => {
        const loadTransfers = async () => {
            try {
                const transferData = await fetchUserSentTransfers(userId);
                setTransfers(transferData.reverse());
            } catch (error) {
                console.error('Geçmiş transfer verileri yüklenirken hata oluştu:', error);
            }
        };

        loadTransfers();
    }, [userId]);

    const handleSelectFocus = () => {
        setIsSelectOpen(true);
    };

    const handleSelectBlur = () => {
        setIsSelectOpen(false);
    };

    const handleDepositClick = () => {
        setIsDeposit(true);
    };

    const handleWithdrawClick = () => {
        setIsDeposit(false);
    };

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const handleTransferCurrencyChange = (event, newValue) => {
        setSelectedTransferCurrency(newValue);
    };

    const handleDepositAmountChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setDepositAmount(value);
        }
    };

    const handleWithdrawAmountChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setWithdrawAmount(value);
        }
    };

    const handleWithdrawIbanChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 26) {
            setWithdrawIban(value);
        }
    };

    const handleSwiftCodeChange = (event) => {
        const value = event.target.value;
        if (/^[A-Za-z0-9]*$/.test(value)) {
            setSwiftCode(value);
        }
    };

    const handleRecipientCustomerNoChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setRecipientCustomerNo(value);
        }
    };

    const handleTransferAmountChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setTransferAmount(value);
        }
    };

    const handleTransactionSubmit = async () => {
        try {
            if (isDeposit) {
                await addMoney(parseFloat(depositAmount), selectedCurrency);
            } else {
                await withdrawMoney(parseFloat(withdrawAmount), selectedCurrency);
            }
            const updatedTransactions = [{
                amount: isDeposit ? depositAmount : withdrawAmount,
                currencyCode: selectedCurrency,
                balanceTransactionType: isDeposit ? 'DEPOSIT' : 'WITHDRAWAL',
                timestamp: new Date().toLocaleString()
            }, ...transactions];
            alert(
                `Banka Bilgileri: Garanti Bankası - Malatya Beydağı Şubesi\n` +
                `Şirket Bilgileri: Pis Yedili Anonim A.Ş.\n` +
                `Seçili IBAN: ${depositIban}\n` +
                `Uyarı: Müşteri numaranızı giriniz.`
            );
            window.location.reload();
            setTransactions(updatedTransactions);
            setDepositAmount('');
            setWithdrawAmount('');
            setSelectedCurrency('');
        } catch (error) {
            alert('İşlem başarısız. Lütfen tekrar deneyin.');
            console.error('İşlem gönderimi sırasında hata:', error);
        }
    };


    const handleTransferSubmit = async () => {
        try {
            const transferData = {
                senderId: userId,
                receiverCustomerNumber: recipientCustomerNo,
                currencyCode: selectedTransferCurrency.value,
                amount: parseFloat(transferAmount),
            };
            const result = await postTransfer(transferData);
            alert('Transfer Başarılı');
            window.location.reload();
            setTransfers([result, ...transfers]);
            setTransferAmount('');
            setSelectedTransferCurrency('');
            setRecipientCustomerNo('');
        } catch (error) {
            console.log('Transfer gönderimi sırasında hata:', error);
        }
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

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

    return (
        <div className="deposit-withdraw-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '97.4vh' }}>
            <div className="content">
                <div className="left-panel">
                    <div className="transfer-section">
                        <h2>Yatır-Çek</h2>
                        <div className="transfer-type">
                            <button
                                className={`transfer-button ${isDeposit ? 'active' : ''}`}
                                onClick={handleDepositClick}
                            >
                                Yatır
                            </button>
                            <button
                                className={`transfer-button ${!isDeposit ? 'active' : ''}`}
                                onClick={handleWithdrawClick}
                                
                            >
                                Çek
                            </button>
                        </div>
                        {isDeposit ? (
                            <div>
                                <div className="bank-details">
                                    <label>Banka bilgilerini görüntüle</label>
                                    <div className="bank-info">
                                        <img src={garanti} alt="Garanti Bankası" />
                                        <p>Garanti Bankası - Malatya Beydağı Şubesi</p>
                                    </div>
                                    <div className="currency-select-wrapper">
                                        <select
                                            value={selectedCurrency}
                                            onChange={handleCurrencyChange}
                                            className={`currency-select ${isSelectOpen ? 'open' : ''}`}
                                            onFocus={handleSelectFocus}
                                            onBlur={handleSelectBlur}
                                        >
                                            <option value="">Döviz Türü Seçin</option>
                                            <option value="TRY">TRY</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="JPY">JPY</option>
                                            <option value="CHF">CHF</option>
                                            <option value="AUD">AUD</option>
                                            <option value="CAD">CAD</option>
                                            <option value="CNY">CNY</option>
                                            <option value="DKK">DKK</option>
                                            <option value="NOK">NOK</option>
                                            <option value="RON">RON</option>
                                            <option value="SAR">SAR</option>
                                            <option value="SEK">SEK</option>
                                        </select>
                                    </div>
                                    {selectedCurrency && (
                                        <>
                                            <div className="iban-container">
                                                <p>{depositIban}</p>
                                            </div>
                                            <div className="amount-section">
                                                <input
                                                    type="text"
                                                    placeholder="Yatırılacak Miktar"
                                                    className="large-input"
                                                    value={depositAmount}
                                                    onChange={handleDepositAmountChange}
                                                />
                                                <Button variant="contained" onClick={handleTransactionSubmit} size="large">Yatır</Button>
                                            </div>
                                            <Button variant="contained" style={{ display: 'inline-block' }}>Kopyala</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="transfer-details">
                                    <select
                                        className="currency-select large-select"
                                        value={selectedCurrency}
                                        onChange={handleCurrencyChange}
                                    >
                                        <option value="">Döviz Türü Seçin</option>
                                        <option value="TRY">TRY</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                        <option value="CHF">CHF</option>
                                        <option value="AUD">AUD</option>
                                        <option value="CAD">CAD</option>
                                        <option value="CNY">CNY</option>
                                        <option value="DKK">DKK</option>
                                        <option value="NOK">NOK</option>
                                        <option value="RON">RON</option>
                                        <option value="SAR">SAR</option>
                                        <option value="SEK">SEK</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="IBAN Girin"
                                        className="iban-input large-input"
                                        value={withdrawIban}
                                        onChange={handleWithdrawIbanChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="SWIFT Kodu"
                                        className="large-input"
                                        value={swiftCode}
                                        onChange={handleSwiftCodeChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Çekilecek Miktar"
                                        className="large-input"
                                        value={withdrawAmount}
                                        onChange={handleWithdrawAmountChange}
                                        
                                    />
                                    <Button variant="contained" onClick={handleTransactionSubmit} size="large" >Çek</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="transaction-history">
                        <h3>Son İşlemlerim</h3>
                        <ul>
                            {currentTransactions.map((transaction, index) => (
                                <li key={index} className="transaction-item">
                                    <div className={`status ${transaction.balanceTransactionType === 'DEPOSIT' ? 'completed' : 'failed'}`}></div>
                                    <div className="details">
                                        <span>{transaction.balanceTransactionType === 'DEPOSIT' ? 'Yükleme' : 'Çekme'}</span>
                                        <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                                        <span className={`amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                                            {transaction.amount} {transaction.currencyCode}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                &lt; Önceki
                            </button>
                            <span>{`Sayfa ${currentPage} / ${totalPages}`}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Sonraki &gt;
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="transfer-section">
                        <h2>Döviz Transferi</h2>
                        <div className="transfer-details">
                            <Autocomplete
                                value={selectedTransferCurrency}
                                onChange={handleTransferCurrencyChange}
                                options={currencyOptions}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Döviz Türü Seçin"
                                        variant="outlined"
                                    />
                                )}
                            />
                            <input
                                type="text"
                                placeholder="Müşteri No"
                                className="customer-input large-input"
                                value={recipientCustomerNo}
                                onChange={handleRecipientCustomerNoChange}
                            />
                            <input
                                type="text"
                                placeholder="Transfer Miktarı"
                                className="amount-input large-input"
                                value={transferAmount}
                                onChange={handleTransferAmountChange}
                            />
                            <Button variant="contained" onClick={handleTransferSubmit} size="large" disabled= {localStorage.getItem("userType") === "PERSONNEL" ? true : false } >Gönder</Button>
                        </div>
                    </div>
                    <div className="transfer-history">
                        <h3>Geçmiş Transferler</h3>
                        <ul>
                            {transfers.map((transfer, index) => {
                                let dateString = 'Tarih Bilinmiyor';
                                if (transfer.timestamp) {
                                    console.log("Ham timestamp verisi:", transfer.timestamp);
                                    try {
                                        const formattedDate = new Date(transfer.timestamp);
                                        dateString = formattedDate.toLocaleString();
                                    } catch (error) {
                                        console.error("Tarih formatlama hatası:", error);
                                    }
                                }
                                return (
                                    <li key={index} className="transfer-item">
                                        <span>Döviz Türü: {transfer.currencyCode}</span>
                                        <span>Tarih: {dateString}</span>
                                        <span>Miktar: {transfer.amount}</span>
                                        <span>Müşteri No: {transfer.receiverCustomerNumber || 'Müşteri No Bilinmiyor'}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DepositWithdrawPage;