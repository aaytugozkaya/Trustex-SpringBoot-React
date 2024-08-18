import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((curr) => (
            <option className="bg-gray-200" value={curr} key={curr}>
              {curr}
            </option>
          ))}
          <optgroup label="Other Currencies">
            {currencies
              .filter((curr) => !favorites.includes(curr.currencyCode))
              .map((curr) => (
                <option value={curr.currencyCode} key={curr.currencyCode}>
                  {curr.currencyCode} - {curr.currencyLabelTR}
                </option>
              ))}
          </optgroup>
        </select>
        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          aria-label={`Toggle favorite for ${currency}`}
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;