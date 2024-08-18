package com.example.trustex.service.impl;

import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.CurrencyRequestDto;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.service.CurrencyConverterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrencyConverterImpl implements CurrencyConverterService {

    private final ExchangeRatesRepository exchangeRatesRepository;

    @Override
    public double convertCurrency(CurrencyRequestDto currencyRequestDto) {
        if (currencyRequestDto.getBase().equals(currencyRequestDto.getTarget())) {
            return 1.0; // Aynı para birimi kullanılıyorsa 1 döndür
        }

        ExchangeRates baseExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(currencyRequestDto.getBase())
                .orElseThrow(() -> new IllegalArgumentException("Exchange rate not found for currency: " + currencyRequestDto.getBase()));
        ExchangeRates targetExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(currencyRequestDto.getTarget())
                .orElseThrow(() -> new IllegalArgumentException("Exchange rate not found for currency: " + currencyRequestDto.getTarget()));

        Double base = (baseExchangeRates.getBuyRate() + baseExchangeRates.getSellRate()) / 2;
        Double target = (targetExchangeRates.getBuyRate() + targetExchangeRates.getSellRate()) / 2;

        Double result = ((1 / base) / (1 / target)) * currencyRequestDto.getAmount();
        return result;
    }
}
