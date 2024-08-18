package com.example.trustex.dto;

import com.example.trustex.entity.BalanceTransactionType;
import com.example.trustex.entity.CurrencyCode;
import com.example.trustex.entity.TransactionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BalanceTransactionDto {
    private Long id;
    private CurrencyCode currencyCode;
    private Double amount;
    private LocalDateTime timestamp;
    private BalanceTransactionType balanceTransactionType;
}
