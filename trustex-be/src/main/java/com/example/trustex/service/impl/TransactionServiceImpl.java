package com.example.trustex.service.impl;

import com.example.trustex.dao.*;
import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.dto.converter.TransactionMapperHelper;
import com.example.trustex.entity.*;
import com.example.trustex.exception.AmountLowerOrEqualZeroException;
import com.example.trustex.exception.BalanceNotEnoughException;
import com.example.trustex.exception.ExchangeRateNotFoundException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final CurrencyRepository currencyRepository;
    private final AssetsRepository assetsRepository;

    public TransactionResponseDto saveTransaction(TransactionRequestDto transactionRequest) {

        if (transactionRequest.getAmount() > 0){

        User user = userRepository.findById(transactionRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException(transactionRequest.getUserId().toString()));

        Assets tryAsset = user.getAssets().stream()
                .filter(asset -> "TRY".equals(asset.getCurrency().getCurrencyCode()))
                .findFirst()
                .orElseGet(() -> createAssetForUser(user, "TRY"));

        Assets targetAsset = user.getAssets().stream()
                .filter(asset -> transactionRequest.getTargetCurrencyCode().equals(asset.getCurrency().getCurrencyCode()))
                .findFirst()
                .orElseGet(() -> createAssetForUser(user, transactionRequest.getTargetCurrencyCode()));

        ExchangeRates exchangeRate = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(transactionRequest.getTargetCurrencyCode())
                .orElseThrow(() -> new ExchangeRateNotFoundException("Exchange rate not found for currency: " + transactionRequest.getTargetCurrencyCode()));

        Transaction transaction = handleTransaction(transactionRequest, user, tryAsset, targetAsset, exchangeRate);

        return TransactionMapperHelper.transactionToTransactionResponseDto(transactionRepository.save(transaction));}

        else {
            throw new AmountLowerOrEqualZeroException("Amount must be greater than 0");
        }
    }

    public List<TransactionResponseDto> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(TransactionMapperHelper::transactionToTransactionResponseDto)
                .toList();
    }

    public List<TransactionResponseDto> getTransactionsByUserId(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(TransactionMapperHelper::transactionToTransactionResponseDto)
                .toList();
    }

    public String deleteTransaction(Long transactionId) {
        transactionRepository.deleteById(transactionId);
        return "Transaction Deleted Succesfully";
    }

    public TransactionResponseDto updateTransaction(Transaction transaction) {
        return TransactionMapperHelper.transactionToTransactionResponseDto(transactionRepository.save(transaction));
    }


    //PRIVATE METHODS
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

    private Transaction handleTransaction(TransactionRequestDto transactionRequest, User user, Assets tryAsset, Assets targetAsset, ExchangeRates targetExchangeRates) {

        boolean isBuyTransaction = transactionRequest.getTransactionType().toString().equals("BUY");
        //Exchange rate al. Daha sonrasinda base TRY oldugu icin 1/exchangeRate yapilir.
        double exchangeRate = 1 / (isBuyTransaction ?  targetExchangeRates.getBuyRate() : targetExchangeRates.getSellRate());

        double transactionAmount = transactionRequest.getAmount();
        double cost = transactionAmount * exchangeRate;
        double commission = cost * getCommissionRate(transactionAmount);
        double foreignExchangeTax = cost * 0.002;
        double total = 0;
        if (isBuyTransaction) {
             total = cost + foreignExchangeTax + commission;
            if (tryAsset.getAmount() < total) {
                throw new BalanceNotEnoughException(transactionRequest.getUserId());
            } else {
                tryAsset.setAmount(tryAsset.getAmount() - total);
                targetAsset.setAvgCost(calculateNewAvgCost(targetAsset.getAmount(), targetAsset.getAvgCost(), transactionAmount, exchangeRate));
                targetAsset.setAmount(targetAsset.getAmount() + transactionAmount);
            }
        } else {
             total = cost - commission;
            if (targetAsset.getAmount() >= transactionAmount) {
                tryAsset.setAmount(tryAsset.getAmount() + total);
                targetAsset.setAmount(targetAsset.getAmount() - transactionAmount);
                foreignExchangeTax = 0.0;
            } else {
                throw new BalanceNotEnoughException(transactionRequest.getUserId());
            }
        }
        Transaction transaction = createTransaction(transactionRequest, user, targetAsset.getCurrency(), exchangeRate,total, commission, foreignExchangeTax);
        assetsRepository.save(tryAsset);
        assetsRepository.save(targetAsset);
        return transaction;
    }

    private double calculateNewAvgCost(double oldAmount, double oldAvgCost, double newAmount, double newCost) {
        return ((oldAmount * oldAvgCost) + (newAmount * newCost)) / (oldAmount + newAmount);
    }

    private Transaction createTransaction(TransactionRequestDto transactionRequest, User user, Currency targetCurrency, double exchangeRate, Double total,Double commission, Double foreignExchangeTax) {
        return Transaction.builder()
                .amount(transactionRequest.getAmount())
                .transactionDate(LocalDateTime.now())
                .transactionType(transactionRequest.getTransactionType())
                .user(user)
                .currencyRate(exchangeRate)
                .commissionAmount(commission)
                .foreignExchangeTax(foreignExchangeTax)
                .targetCurrency(targetCurrency)
                .total(total)
                .build();
    }

    private Double getCommissionRate(Double amount) {
        if (amount >= 0 && amount <= 2000) {
            return 0.0020; // %0.20
        } else if (amount > 2000 && amount <= 10000) {
            return 0.0019; // %0.19
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
            return 0.0;
        }
    }

}
