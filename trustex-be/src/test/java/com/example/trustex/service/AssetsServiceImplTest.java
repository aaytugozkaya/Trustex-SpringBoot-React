package com.example.trustex.service;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.AssetResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.entity.User;
import com.example.trustex.exception.AssetNotFoundException;
import com.example.trustex.exception.CurrencyNotFoundException;
import com.example.trustex.service.UserService;
import com.example.trustex.service.impl.AssetsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AssetsServiceImplTest {

    @InjectMocks
    private AssetsServiceImpl assetsService;

    @Mock
    private AssetsRepository assetsRepository;

    @Mock
    private ExchangeRatesRepository exchangeRatesRepository;

    @Mock
    private CurrencyRepository currencyRepository;

    @Mock
    private UserService userService;

    private User testUser;
    private Currency testCurrency;
    private Assets testAsset;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setId(1L);

        testCurrency = new Currency();
        testCurrency.setCurrencyCode("USD");
        testCurrency.setCurrencyLabelTR("Amerikan DolarÄ±");

        testAsset = new Assets();
        testAsset.setId(1L);
        testAsset.setUser(testUser);
        testAsset.setCurrency(testCurrency);
        testAsset.setAmount(100.0);
        testAsset.setAvgCost(1.0);
    }

    @Test
    void getAllAssets_ShouldReturnAssetsList() {
        when(assetsRepository.findAll()).thenReturn(Arrays.asList(testAsset));

        List<Assets> result = assetsService.getAllAssets();

        assertEquals(1, result.size());
        verify(assetsRepository, times(1)).findAll();
    }

    @Test
    void getAssetsByUser_ShouldReturnAssetsList() {
        when(assetsRepository.findByUser(testUser)).thenReturn(Arrays.asList(testAsset));

        List<Assets> result = assetsService.getAssetsByUser(testUser);

        assertEquals(1, result.size());
        assertEquals(testAsset, result.get(0));
        verify(assetsRepository, times(1)).findByUser(testUser);
    }

    @Test
    void getUserAssetsInTL_ShouldReturnAssetResponseDtos() {
        ExchangeRates exchangeRates = new ExchangeRates();
        exchangeRates.setBuyRate(18.0);
        exchangeRates.setSellRate(18.5);

        when(userService.getUserById(testUser.getId())).thenReturn(testUser);
        when(assetsRepository.findByUser(testUser)).thenReturn(Arrays.asList(testAsset));
        when(exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(testCurrency.getCurrencyCode()))
                .thenReturn(Optional.of(exchangeRates));

        List<AssetResponseDto> result = assetsService.getUserAssetsInTL(testUser.getId());

        assertEquals(1, result.size());
        assertEquals(testCurrency.getCurrencyCode(), result.get(0).getCurrencyCode());
        verify(assetsRepository, times(1)).findByUser(testUser);
        verify(exchangeRatesRepository, times(1)).findNewestExchangeRateByCurrencyCode(testCurrency.getCurrencyCode());
    }

    @Test
    void saveAsset_ShouldSaveAsset() {
        when(currencyRepository.findById(testCurrency.getCurrencyCode())).thenReturn(Optional.of(testCurrency));
        when(assetsRepository.save(any(Assets.class))).thenReturn(testAsset);

        Assets result = assetsService.saveAsset(testAsset);

        assertNotNull(result);
        assertEquals(testAsset, result);
        verify(assetsRepository, times(1)).save(testAsset);
    }

    @Test
    void saveAsset_ShouldThrowCurrencyNotFoundException_WhenCurrencyNotFound() {
        when(currencyRepository.findById(testCurrency.getCurrencyCode())).thenReturn(Optional.empty());

        assertThrows(CurrencyNotFoundException.class, () -> assetsService.saveAsset(testAsset));

        verify(assetsRepository, never()).save(any(Assets.class));
    }

    @Test
    void getAssetByUserAndCurrencyCode_ShouldReturnAsset() {
        when(assetsRepository.findByUserAndCurrencyCurrencyCode(testUser, testCurrency.getCurrencyCode()))
                .thenReturn(Optional.of(testAsset));

        Assets result = assetsService.getAssetByUserAndCurrencyCode(testUser, testCurrency.getCurrencyCode());

        assertNotNull(result);
        assertEquals(testAsset, result);
        verify(assetsRepository, times(1))
                .findByUserAndCurrencyCurrencyCode(testUser, testCurrency.getCurrencyCode());
    }

    @Test
    void getAssetByUserAndCurrencyCode_ShouldThrowAssetNotFoundException() {
        when(assetsRepository.findByUserAndCurrencyCurrencyCode(testUser, testCurrency.getCurrencyCode()))
                .thenReturn(Optional.empty());

        assertThrows(AssetNotFoundException.class, () ->
                assetsService.getAssetByUserAndCurrencyCode(testUser, testCurrency.getCurrencyCode()));

        verify(assetsRepository, times(1))
                .findByUserAndCurrencyCurrencyCode(testUser, testCurrency.getCurrencyCode());
    }
}
