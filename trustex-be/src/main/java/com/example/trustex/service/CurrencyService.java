package com.example.trustex.service;

import com.example.trustex.dto.CurrencyResponseDto;
import com.example.trustex.entity.Currency;

import java.util.List;
import java.util.Optional;

public interface CurrencyService {
    List<CurrencyResponseDto> getAllCurrencies();
    Optional<Currency> findById(String currencyCode);
}
