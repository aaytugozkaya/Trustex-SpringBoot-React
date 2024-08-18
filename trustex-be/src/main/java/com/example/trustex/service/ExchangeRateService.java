package com.example.trustex.service;

import com.example.trustex.dto.ExchangeRateResponseDto;
import com.example.trustex.entity.ExchangeRates;

import java.util.List;

public interface ExchangeRateService {
    String getExchangeRateFromApi();
    List<ExchangeRateResponseDto> getExchangeRates();
    ExchangeRateResponseDto getExchangeRateByCurrencyCode(String currencyCode);
    List<ExchangeRateResponseDto> getMainCurrencies();
}
