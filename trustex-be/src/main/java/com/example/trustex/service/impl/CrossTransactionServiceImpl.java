package com.example.trustex.service.impl;

import com.example.trustex.dao.*;
import com.example.trustex.dto.CrossTransactionRequestDto;
import com.example.trustex.dto.CrossTransactionResponseDto;
import com.example.trustex.dto.converter.CrossTransactionMapperHelper;
import com.example.trustex.entity.*;
import com.example.trustex.exception.AmountLowerOrEqualZeroException;
import com.example.trustex.exception.BalanceNotEnoughException;
import com.example.trustex.exception.ExchangeRateNotFoundException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.CrossTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CrossTransactionServiceImpl implements CrossTransactionService {

    private final UserRepository userRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final CurrencyRepository currencyRepository;
    private final AssetsRepository assetsRepository;
    private final CrossTransactionRepository crossTransactionRepository;

    public List<CrossTransactionResponseDto> getAllTransactions() {
        return crossTransactionRepository.findAll()
                .stream()
                .map(CrossTransactionMapperHelper::crossTransactionToCrossTransactionResponseDto)
                .collect(Collectors.toList());
    }
    public List<CrossTransactionResponseDto> getTransactionByUserId(Long userId) {
        return crossTransactionRepository.findByUserId(userId)
                .stream()
                .map(CrossTransactionMapperHelper::crossTransactionToCrossTransactionResponseDto)
                .collect(Collectors.toList());
    }

    public CrossTransactionResponseDto saveTransaction(CrossTransactionRequestDto crossTransactionRequest) {

        if (crossTransactionRequest.getAmount() > 0) {

            User user = userRepository.findById(crossTransactionRequest.getUserId())
                    .orElseThrow(() -> new UserNotFoundException(crossTransactionRequest.getUserId().toString()));

            Assets baseAsset = user.getAssets().stream()
                    .filter(asset -> crossTransactionRequest.getBaseCurrencyCode().equals(asset.getCurrency().getCurrencyCode()))
                    .findFirst()
                    .orElseGet(() -> createAssetForUser(user, crossTransactionRequest.getBaseCurrencyCode()));

            Assets targetAsset = user.getAssets().stream()
                    .filter(asset -> crossTransactionRequest.getTargetCurrencyCode().equals(asset.getCurrency().getCurrencyCode()))
                    .findFirst()
                    .orElseGet(() -> createAssetForUser(user, crossTransactionRequest.getTargetCurrencyCode()));

            ExchangeRates baseExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(crossTransactionRequest.getBaseCurrencyCode())
                    .orElseThrow(() -> new ExchangeRateNotFoundException("Exchange rate not found for currency: " + crossTransactionRequest.getBaseCurrencyCode()));

            ExchangeRates targetExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(crossTransactionRequest.getTargetCurrencyCode())
                    .orElseThrow(() -> new ExchangeRateNotFoundException("Exchange rate not found for currency: " + crossTransactionRequest.getTargetCurrencyCode()));

            CrossTransaction crossTransaction = handleTransaction(crossTransactionRequest, user, baseAsset, targetAsset, baseExchangeRates, targetExchangeRates);

            return CrossTransactionMapperHelper.crossTransactionToCrossTransactionResponseDto(crossTransactionRepository.save(crossTransaction));
        } else {
            throw new AmountLowerOrEqualZeroException("Amount must be greater than 0");
        }
    }

    private Assets createAssetForUser(User user, String currencyCode) {
        //If no asset is found in demanded currency , create one for the user.
        Assets newTransactionAsset = Assets.builder()
                .assetName(currencyCode + "Wallet")
                .amount(0.0)
                .avgCost(0.0)
                .currency(currencyRepository.findById(currencyCode).orElseThrow(() -> new IllegalArgumentException(currencyCode + " currency not found")))
                .user(user)
                .build();
        assetsRepository.save(newTransactionAsset);
        return newTransactionAsset;
    }

    private CrossTransaction createCrossTransaction(CrossTransactionRequestDto crossTransactionRequest, User user, Currency baseCurrency, Currency targetCurrency, double exchangeRate, Double total,Double commission, Double foreignExchangeTax) {
        return CrossTransaction.builder()
                .amount(crossTransactionRequest.getAmount())
                .transactionDate(LocalDateTime.now())
                .user(user)
                .currencyRate(exchangeRate)
                .commissionAmount(commission)
                .foreignExchangeTax(foreignExchangeTax)
                .baseCurrency(baseCurrency)
                .targetCurrency(targetCurrency)
                .total(total)
                .build();
    }

    private CrossTransaction handleTransaction(CrossTransactionRequestDto crossTransactionRequest, User user, Assets baseAsset, Assets targetAsset, ExchangeRates baseExchangeRates, ExchangeRates targetExchangeRates) {

        double baseRate = 1/baseExchangeRates.getSellRate() ;
        double targetRate = 1/targetExchangeRates.getBuyRate();
        double exchangeRate = targetRate/baseRate ;

        double transactionAmount = crossTransactionRequest.getAmount();
        double cost = transactionAmount * exchangeRate;
        double commission = cost * getCommissionRate(transactionAmount);
        double foreignExchangeTax = cost * 0.002;

        double totalCost = cost + foreignExchangeTax + commission;
        if (baseAsset.getAmount() < totalCost) {
            throw new BalanceNotEnoughException(crossTransactionRequest.getUserId());
        } else {
            baseAsset.setAmount(baseAsset.getAmount() - totalCost);
            targetAsset.setAvgCost(calculateNewAvgCost(targetAsset.getAmount(), targetAsset.getAvgCost(), transactionAmount, targetRate));
            targetAsset.setAmount(targetAsset.getAmount() + transactionAmount);
        }

        CrossTransaction crossTransaction = createCrossTransaction(crossTransactionRequest, user, baseAsset.getCurrency(), targetAsset.getCurrency(), exchangeRate,totalCost, commission, foreignExchangeTax);
        assetsRepository.save(baseAsset);
        assetsRepository.save(targetAsset);
        return crossTransaction;
    }

    private double calculateNewAvgCost(double oldAmount, double oldAvgCost, double newAmount, double newCost) {
        return ((oldAmount * oldAvgCost) + (newAmount * newCost)) / (oldAmount + newAmount);
    }
    private Double getCommissionRate(Double amount) {
        if (amount >= 0 && amount <= 2000) {
            return 0.0020; // %0.20
        } else if (amount > 2000 && amount <= 10000) {
            return 0.0019; // %0.19e
        } else if (amount > 10000 && amount <= 25000) {
            return 0.0018; // %0.18
        } else if (amount > 25000 && amount <= 100000) {
            return 0.0016; // %0.16
        } else if (amount > 100000 && amount <= 250000) {
            return 0.0012; // %0.12
        } else if (amount > 250000 && amount <= 1000000) {
            return 0.0010; // %0.10
        } else if (amount > 1000000 && amount <= 2000000) {
            return 0.0009; // %0.09
        } else if (amount > 2000000) {
            return 0.0008; // %0.08
        } else {
            return 0.0; // Return 0 if the amount is negative or doesn't fall into any range
        }
    }


}
