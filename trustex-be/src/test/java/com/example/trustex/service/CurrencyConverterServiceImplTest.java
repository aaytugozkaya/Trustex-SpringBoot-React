package com.example.trustex.service;

import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.CurrencyRequestDto;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.service.impl.CurrencyConverterImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CurrencyConverterServiceImpTest {

    @Mock
    private ExchangeRatesRepository exchangeRatesRepository;

    @InjectMocks
    private CurrencyConverterImpl currencyConverter;

    private CurrencyRequestDto currencyRequestDto;
    private ExchangeRates baseExchangeRates;
    private ExchangeRates targetExchangeRates;

    @BeforeEach
    void setUp() {
        currencyRequestDto = new CurrencyRequestDto();
        currencyRequestDto.setBase("USD");
        currencyRequestDto.setTarget("EUR");
        currencyRequestDto.setAmount(100.0);

        baseExchangeRates = new ExchangeRates();
        baseExchangeRates.setBuyRate(1.0);
        baseExchangeRates.setSellRate(1.2);

        targetExchangeRates = new ExchangeRates();
        targetExchangeRates.setBuyRate(0.8);
        targetExchangeRates.setSellRate(0.85);
    }

    @Test
    void convertCurrency_shouldReturnOne_whenBaseAndTargetAreSame() {
        currencyRequestDto.setTarget("USD");

        double result = currencyConverter.convertCurrency(currencyRequestDto);

        assertEquals(1.0, result);
    }

    @Test
    void convertCurrency_shouldThrowException_whenBaseCurrencyNotFound() {
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode("USD"))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> currencyConverter.convertCurrency(currencyRequestDto));

        verify(exchangeRatesRepository, times(1)).findNewestExchangeRateByCurrencyCode("USD");
    }

    @Test
    void convertCurrency_shouldThrowException_whenTargetCurrencyNotFound() {
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode("USD"))
                .thenReturn(Optional.of(baseExchangeRates));
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode("EUR"))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> currencyConverter.convertCurrency(currencyRequestDto));

        verify(exchangeRatesRepository, times(1)).findNewestExchangeRateByCurrencyCode("EUR");
    }

    @Test
    void convertCurrency_shouldReturnConvertedAmount_whenExchangeRatesAreFound() {
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode("USD"))
                .thenReturn(Optional.of(baseExchangeRates));
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode("EUR"))
                .thenReturn(Optional.of(targetExchangeRates));

        double result = currencyConverter.convertCurrency(currencyRequestDto);

        Double expectedBaseRate = (baseExchangeRates.getBuyRate() + baseExchangeRates.getSellRate()) / 2;
        Double expectedTargetRate = (targetExchangeRates.getBuyRate() + targetExchangeRates.getSellRate()) / 2;
        Double expectedResult = ((1 / expectedBaseRate) / (1 / expectedTargetRate)) * currencyRequestDto.getAmount();

        assertEquals(expectedResult, result);
    }
}
