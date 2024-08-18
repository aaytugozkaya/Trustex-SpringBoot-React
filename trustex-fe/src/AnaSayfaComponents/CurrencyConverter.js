import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { Typography } from "@mui/material";
import { HiArrowsRightLeft } from "react-icons/hi2";
import "../ConverterCss/ConverterCss.css";
import { MDBIcon } from "mdb-react-ui-kit";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );
  const [error, setError] = useState(null);
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("/api/v1/currencies/getAllCurrencies");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setCurrencies(data);
    } catch (error) {
      console.error("Error Fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);


  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(6);
  }

  const convertCurrency = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    setConverting(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          base: fromCurrency,
          target: toCurrency,
        }),
      });

      if (!res.ok) throw new Error("Failed to convert currency");

      const data = await res.json();
      setConvertedAmount(`${digitSetting(data)} ${toCurrency}`);
    } catch (error) {
      setError("Error converting currency: " + error.message);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="custom-container">
      <h2 className="flex justify-center items-center mb-5 text-3xl font-semibold text-white p-4 bg-[#031a55] rounded-lg shadow-md h-16">
        Döviz Çevirici
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="Para Birimi:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="Çevrilecek Para Birimi:"
          handleFavorite={handleFavorite}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Miktar:
        </label>
        <input
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 text-white rounded-md hover:bg-[#031a55] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`}
          style={{ backgroundColor: "#062065", zIndex: 10 }}
          disabled={converting || !amount || isNaN(amount) || amount <= 0}
        >
          Çevir
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Çevrilen Miktar: {convertedAmount} <br />
          <Typography
            className="custom-typography text-left"
            sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <MDBIcon fas icon="exclamation-circle" /> &ensp; Dikkat: Bu döviz
            çevirici, piyasadaki ortalama kur oranlarını yansıtmaktadır. <br />
            Gerçek işlem oranları değişiklik gösterebilir.
          </Typography>

        </div>
      )}
      {error && (
        <div className="mt-4 text-lg font-medium text-right text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
