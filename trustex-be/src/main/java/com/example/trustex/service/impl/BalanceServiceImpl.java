package com.example.trustex.service.impl;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.BalanceTransactionRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.BalanceTransactionDto;
import com.example.trustex.dto.BalanceTransactionResponseDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.entity.*;
import com.example.trustex.exception.*;
import com.example.trustex.service.BalanceService;
import com.example.trustex.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BalanceServiceImpl implements BalanceService {

    private final UserService userService;
    private final BalanceTransactionRepository balanceTransactionRepository;
    private final CurrencyRepository currencyRepository;
    private final AssetsRepository assetsRepository;


    @Override
    @Transactional
    public BalanceTransactionResponseDto addMoneyToAsset(Long userId, AddMoneyRequestDto request) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));

        validateCurrencyCode(request.getCurrencyCode());

        Currency currency = currencyRepository.findByCurrencyCode(request.getCurrencyCode().name())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı"));

        if (request.getAmount() <= 0) {
            throw new AmountLowerOrEqualZeroException("Miktar sıfır veya sıfırdan küçük olamaz.");
        }

        user.getAssets().stream()
                .filter(assets -> assets.getCurrency().getCurrencyCode().equals(request.getCurrencyCode().name()))
                .findFirst()
                .ifPresentOrElse(
                        assets -> assets.setAmount(assets.getAmount() + request.getAmount()),
                        () -> {
                            Assets newAsset = Assets.builder()
                                    .currency(currency)
                                    .assetName(currency.getCurrencyCode() + "Wallet")
                                    .amount(request.getAmount())
                                    .avgCost(0.0)
                                    .user(user)
                                    .build();
                            assetsRepository.save(newAsset);
                        }
                );
        logTransaction(user, BalanceTransactionType.DEPOSIT, request.getAmount(), request.getCurrencyCode());
        return BalanceTransactionResponseDto.builder()
                .amount(request.getAmount())
                .currencyCode(request.getCurrencyCode())
                .timestamp(LocalDateTime.now())
                .balanceTransactionType(BalanceTransactionType.DEPOSIT)
                .build();
    }

    @Override
    @Transactional
    public BalanceTransactionResponseDto withdrawMoneyFromAsset(Long userId, WithdrawMoneyRequestDto request) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));

        validateCurrencyCode(request.getCurrencyCode());

        Assets asset = user.getAssets().stream()
                .filter(a -> a.getCurrency().getCurrencyCode().equals(request.getCurrencyCode().name()))
                .findFirst()
                .orElseThrow(() -> new AssetNotFoundException(request.getCurrencyCode().name() + " bakiyesi bulunamadı."));

        if (asset.getAmount() < request.getAmount()) {
            throw new BalanceNotEnoughException(asset.getUser().getId());
        }

        if (request.getAmount() <= 0) {
            throw new AmountLowerOrEqualZeroException("Miktar sıfır veya sıfırdan küçük olamaz.");
        } else {
            asset.setAmount(asset.getAmount() - request.getAmount());
            assetsRepository.save(asset);
        }
        logTransaction(user, BalanceTransactionType.WITHDRAWAL, request.getAmount(), request.getCurrencyCode());
        return BalanceTransactionResponseDto.builder()
                .amount(request.getAmount())
                .currencyCode(request.getCurrencyCode())
                .timestamp(LocalDateTime.now())
                .balanceTransactionType(BalanceTransactionType.WITHDRAWAL)
                .build();

    }

    private void validateCurrencyCode(CurrencyCode currencyCode) {
        boolean isValid = false;
        for (CurrencyCode code : CurrencyCode.values()) {
            if (code == currencyCode) {
                isValid = true;
                break;
            }
        }
        if (!isValid){
            throw new IllegalArgumentException("Geçersiz döviz türü: " + currencyCode);
        }
    }

    private void logTransaction(User user, BalanceTransactionType type, double amount, CurrencyCode currencyCode) {
        BalanceTransaction balanceTransaction = new BalanceTransaction();
        balanceTransaction.setUser(user);
        balanceTransaction.setBalanceTransactionType(type);
        balanceTransaction.setAmount(amount);
        balanceTransaction.setCurrencyCode(currencyCode);
        balanceTransaction.setTimestamp(LocalDateTime.now());

        balanceTransactionRepository.save(balanceTransaction);
    }

    @Override
    public List<BalanceTransactionDto> getUserBalanceTransactions(Long userId) {
        User user = userService.getUserById(userId);
        List<BalanceTransaction> transactions = balanceTransactionRepository.findByUser(user);
        return transactions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private BalanceTransactionDto convertToDto(BalanceTransaction balanceTransaction) {
        BalanceTransactionDto dto = new BalanceTransactionDto();
        dto.setId(balanceTransaction.getId());
        dto.setCurrencyCode(balanceTransaction.getCurrencyCode());
        dto.setAmount(balanceTransaction.getAmount());
        dto.setTimestamp(balanceTransaction.getTimestamp());
        dto.setBalanceTransactionType(balanceTransaction.getBalanceTransactionType());
        return dto;
    }
}
