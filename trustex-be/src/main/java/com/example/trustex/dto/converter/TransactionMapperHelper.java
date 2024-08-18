package com.example.trustex.dto.converter;

import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.Transaction;
import com.example.trustex.entity.User;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;


public class TransactionMapperHelper {

    public static Transaction transactionRequestToTransaction(TransactionRequestDto transactionRequestDto) {

        return Transaction.builder()
                .amount(transactionRequestDto.getAmount())
                .transactionDate(LocalDateTime.now())
                .transactionType(transactionRequestDto.getTransactionType())
                .build();

    }

    public static Transaction transactionRequestToTransaction(TransactionRequestDto transactionRequestDto, User user, Currency baseCurrency, Currency targetCurrency,double exchangeRate, double commission, double foreignExchangeTax) {

        return Transaction.builder()
                .amount(transactionRequestDto.getAmount())
                .transactionDate(LocalDateTime.now())
                .transactionType(transactionRequestDto.getTransactionType())
                .user(user)
                .currencyRate(exchangeRate)
                .commissionAmount(commission)
                .foreignExchangeTax(foreignExchangeTax)
                .targetCurrency(targetCurrency)
                .total(transactionRequestDto.getAmount() * exchangeRate)
                .build();
    }

    public static TransactionResponseDto transactionToTransactionResponseDto(Transaction transaction) {
        return TransactionResponseDto.builder()
                .transactionId(transaction.getTransactionId())
                .amount(transaction.getAmount())
                .total(transaction.getTotal())
                .targetCurrencyCode(transaction.getTargetCurrency().getCurrencyCode())
                .currencyRate(transaction.getCurrencyRate())
                .transactionDate(transaction.getTransactionDate().toString())
                .commissionAmount(transaction.getCommissionAmount())
                .foreignExchangeTax(transaction.getForeignExchangeTax())
                .transactionType(transaction.getTransactionType().toString())
                .userId(transaction.getUser().getId())
                .build();
    }
}
