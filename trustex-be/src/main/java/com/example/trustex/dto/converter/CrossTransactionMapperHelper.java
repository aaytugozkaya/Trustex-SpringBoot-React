package com.example.trustex.dto.converter;

import com.example.trustex.dto.CrossTransactionResponseDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.entity.CrossTransaction;
import com.example.trustex.entity.Transaction;

public class CrossTransactionMapperHelper {

    public static CrossTransactionResponseDto crossTransactionToCrossTransactionResponseDto(CrossTransaction crossTransaction) {
        return CrossTransactionResponseDto.builder()
                .crossTransactionId(crossTransaction.getCrossTransactionId())
                .amount(crossTransaction.getAmount())
                .total(crossTransaction.getTotal())
                .baseCurrencyCode(crossTransaction.getBaseCurrency().getCurrencyCode())
                .targetCurrencyCode(crossTransaction.getTargetCurrency().getCurrencyCode())
                .currencyRate(crossTransaction.getCurrencyRate())
                .transactionDate(crossTransaction.getTransactionDate().toString())
                .commissionAmount(crossTransaction.getCommissionAmount())
                .foreignExchangeTax(crossTransaction.getForeignExchangeTax())
                .userId(crossTransaction.getUser().getId())
                .build();
    }
}
