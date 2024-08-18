package com.example.trustex.service;

import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.ExchangeRateResponseDto;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.exception.CurrencyNotFoundException;
import com.example.trustex.service.impl.ExchangeRateServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExchangeRateServiceImplTest {

    @InjectMocks
    private ExchangeRateServiceImpl exchangeRateService;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private ExchangeRatesRepository exchangeRateRepository;

    @Mock
    private CurrencyRepository currencyRepository;

    private Currency testCurrency;
    private ExchangeRates testExchangeRate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testCurrency = new Currency();
        testCurrency.setCurrencyCode("USD");
        testCurrency.setCurrencyLabelTR("Amerikan DolarÄ±");

        testExchangeRate = new ExchangeRates();
        testExchangeRate.setCurrency(testCurrency);
        testExchangeRate.setBuyRate(18.0);
        testExchangeRate.setSellRate(18.18);
        testExchangeRate.setTimeStamp(LocalDateTime.now());
    }

    @Test
    void getExchangeRateFromApi_ShouldSaveExchangeRatesSuccessfully() {
        // Mocking API response
        Map<String, Object> apiResponse = new HashMap<>();
        apiResponse.put("time_last_update_unix", 1684567890L);
        Map<String, Number> conversionRates = new HashMap<>();
        conversionRates.put("USD", 18.0);
        apiResponse.put("conversion_rates", conversionRates);

        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(apiResponse);
        when(currencyRepository.findById("USD")).thenReturn(Optional.of(testCurrency));

        String result = exchangeRateService.getExchangeRateFromApi();

        assertEquals("Exchange rates are updated successfully", result);
        verify(exchangeRateRepository, times(1)).save(any(ExchangeRates.class));
    }

    @Test
    void getExchangeRateFromApi_ShouldThrowException_WhenCurrencyNotFound() {
        // Mocking API response
        Map<String, Object> apiResponse = new HashMap<>();
        apiResponse.put("time_last_update_unix", 1684567890L);
        Map<String, Number> conversionRates = new HashMap<>();
        conversionRates.put("USD", 18.0);
        apiResponse.put("conversion_rates", conversionRates);

        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(apiResponse);
        when(currencyRepository.findById("USD")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> exchangeRateService.getExchangeRateFromApi());
        verify(exchangeRateRepository, never()).save(any(ExchangeRates.class));
    }

    @Test
    void getExchangeRates_ShouldReturnExchangeRateList() {
        when(exchangeRateRepository.findByOrderLastDesc()).thenReturn(Arrays.asList(testExchangeRate));

        List<ExchangeRateResponseDto> result = exchangeRateService.getExchangeRates();

        assertEquals(1, result.size());
        assertEquals(testCurrency.getCurrencyCode(), result.get(0).getCurrencyCode());
        verify(exchangeRateRepository, times(1)).findByOrderLastDesc();
    }

    @Test
    void getExchangeRateByCurrencyCode_ShouldReturnExchangeRate() {
        when(exchangeRateRepository.findNewestExchangeRateByCurrencyCode("USD"))
                .thenReturn(Optional.of(testExchangeRate));

        ExchangeRateResponseDto result = exchangeRateService.getExchangeRateByCurrencyCode("USD");

        assertNotNull(result);
        assertEquals("USD", result.getCurrencyCode());
        verify(exchangeRateRepository, times(1)).findNewestExchangeRateByCurrencyCode("USD");
    }

    @Test
    void getExchangeRateByCurrencyCode_ShouldThrowException_WhenNotFound() {
        when(exchangeRateRepository.findNewestExchangeRateByCurrencyCode("USD"))
                .thenReturn(Optional.empty());

        assertThrows(CurrencyNotFoundException.class, () ->
                exchangeRateService.getExchangeRateByCurrencyCode("USD"));

        verify(exchangeRateRepository, times(1)).findNewestExchangeRateByCurrencyCode("USD");
    }

    @Test
    void getMainCurrencies_ShouldReturnExchangeRatesForSelectedCurrencies() {
        when(exchangeRateRepository.findExchangeRatesForSelectedCurrencies(anyList()))
                .thenReturn(Arrays.asList(testExchangeRate));

        List<ExchangeRateResponseDto> result = exchangeRateService.getMainCurrencies();

        assertEquals(1, result.size());
        assertEquals("USD", result.get(0).getCurrencyCode());
        verify(exchangeRateRepository, times(1)).findExchangeRatesForSelectedCurrencies(anyList());
    }
}