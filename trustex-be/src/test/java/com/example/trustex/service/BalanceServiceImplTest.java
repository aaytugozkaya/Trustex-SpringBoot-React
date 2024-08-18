package com.example.trustex.service;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.BalanceTransactionRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.BalanceTransactionResponseDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.entity.*;
import com.example.trustex.exception.*;
import com.example.trustex.service.UserService;
import com.example.trustex.service.impl.BalanceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BalanceServiceImplTest {

    @Mock
    private UserService userService;

    @Mock
    private BalanceTransactionRepository balanceTransactionRepository;

    @Mock
    private CurrencyRepository currencyRepository;

    @Mock
    private AssetsRepository assetsRepository;

    @InjectMocks
    private BalanceServiceImpl balanceService;

    private User user;
    private Currency currency;
    private Assets asset;
    private AddMoneyRequestDto addMoneyRequestDto;
    private WithdrawMoneyRequestDto withdrawMoneyRequestDto;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        ArrayList assets = new ArrayList<>();
        user.setAssets(assets);

        currency = new Currency();
        currency.setCurrencyCode("USD");

        asset = Assets.builder()
                .currency(currency)
                .assetName("USDWallet")
                .amount(1000.0)
                .avgCost(0.0)
                .user(user)
                .build();
        assets.add(asset);


        addMoneyRequestDto = new AddMoneyRequestDto(500.0, CurrencyCode.USD);

        withdrawMoneyRequestDto = new WithdrawMoneyRequestDto();
        withdrawMoneyRequestDto.setCurrencyCode(CurrencyCode.USD);
        withdrawMoneyRequestDto.setAmount(500.0);
        when(currencyRepository.findByCurrencyCode(addMoneyRequestDto.getCurrencyCode().name())).thenReturn(Optional.of(currency));
        when(currencyRepository.findByCurrencyCode(withdrawMoneyRequestDto.getCurrencyCode().name())).thenReturn(Optional.of(currency));
        //when(assetsRepository.findByCurrencyCode(withdrawMoneyRequestDto.getCurrencyCode().name())).thenReturn(Optional.of(currency));
    }

    @Test
    void addMoneyToAsset_shouldAddMoney_whenAssetExists() {
        user.getAssets().add(asset);
        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(currencyRepository.findByCurrencyCode("USD")).thenReturn(Optional.of(currency));

        BalanceTransactionResponseDto response = balanceService.addMoneyToAsset(1L, addMoneyRequestDto);

        assertNotNull(response);
        assertEquals(1500.0, asset.getAmount());
        verify(assetsRepository, never()).save(any(Assets.class));
        verify(balanceTransactionRepository, times(1)).save(any(BalanceTransaction.class));
    }

    @Test
    void addMoneyToAsset_shouldCreateNewAsset_whenAssetDoesNotExist() {
        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(currencyRepository.findByCurrencyCode("USD")).thenReturn(Optional.of(currency));

        BalanceTransactionResponseDto response = balanceService.addMoneyToAsset(1L, addMoneyRequestDto);

        assertNotNull(response);
        verify(assetsRepository, times(1)).save(any(Assets.class));
        verify(balanceTransactionRepository, times(1)).save(any(BalanceTransaction.class));
    }

    @Test
    void addMoneyToAsset_shouldThrowException_whenAmountIsZeroOrNegative() {
        addMoneyRequestDto.setAmount(0.0);

        when(userService.findById(1L)).thenReturn(Optional.of(user));

        assertThrows(AmountLowerOrEqualZeroException.class, () -> balanceService.addMoneyToAsset(1L, addMoneyRequestDto));
        verify(assetsRepository, never()).save(any(Assets.class));
    }

    @Test
    void addMoneyToAsset_shouldThrowException_whenUserNotFound() {
        when(userService.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> balanceService.addMoneyToAsset(1L, addMoneyRequestDto));
    }

    @Test
    void withdrawMoneyFromAsset_shouldWithdrawMoney_whenBalanceIsEnough() {
        user.getAssets().add(asset);
        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(currencyRepository.findByCurrencyCode("USD")).thenReturn(Optional.of(currency));

        BalanceTransactionResponseDto response = balanceService.withdrawMoneyFromAsset(1L, withdrawMoneyRequestDto);

        assertNotNull(response);
        assertEquals(500.0, asset.getAmount());
        verify(assetsRepository, times(1)).save(any(Assets.class));
        verify(balanceTransactionRepository, times(1)).save(any(BalanceTransaction.class));
    }

    @Test
    void withdrawMoneyFromAsset_shouldThrowException_whenBalanceIsNotEnough() {
        user.getAssets().add(asset);
        withdrawMoneyRequestDto.setAmount(2000.0);

        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(currencyRepository.findByCurrencyCode("USD")).thenReturn(Optional.of(currency));

        assertThrows(BalanceNotEnoughException.class, () -> balanceService.withdrawMoneyFromAsset(1L, withdrawMoneyRequestDto));
        verify(assetsRepository, never()).save(any(Assets.class));
    }

    @Test
    void withdrawMoneyFromAsset_shouldThrowException_whenAssetNotFound() {
        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(currencyRepository.findByCurrencyCode("USD")).thenReturn(Optional.of(currency));

        assertThrows(AssetNotFoundException.class, () -> balanceService.withdrawMoneyFromAsset(1L, withdrawMoneyRequestDto));
    }

    @Test
    void withdrawMoneyFromAsset_shouldThrowException_whenUserNotFound() {
        when(userService.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> balanceService.withdrawMoneyFromAsset(1L, withdrawMoneyRequestDto));
    }

    @Test
    void withdrawMoneyFromAsset_shouldThrowException_whenAmountIsZeroOrNegative() {
        withdrawMoneyRequestDto.setAmount(0.0);

        when(userService.findById(1L)).thenReturn(Optional.of(user));

        assertThrows(AmountLowerOrEqualZeroException.class, () -> balanceService.withdrawMoneyFromAsset(1L, withdrawMoneyRequestDto));
        verify(assetsRepository, never()).save(any(Assets.class));
    }
}
