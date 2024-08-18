package com.example.trustex.service;

import com.example.trustex.dto.CurrencyRequestDto;

public interface CurrencyConverterService {
    double convertCurrency(CurrencyRequestDto currencyRequestDto);
}