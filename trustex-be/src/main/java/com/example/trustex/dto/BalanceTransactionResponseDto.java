package com.example.trustex.dto;

import com.example.trustex.entity.BalanceTransactionType;
import com.example.trustex.entity.CurrencyCode;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class BalanceTransactionResponseDto {

    private Double amount;
    private CurrencyCode currencyCode;
    private LocalDateTime timestamp;
    private BalanceTransactionType balanceTransactionType;
}
