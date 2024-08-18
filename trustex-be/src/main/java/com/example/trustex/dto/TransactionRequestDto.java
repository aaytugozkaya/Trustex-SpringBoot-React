package com.example.trustex.dto;

import com.example.trustex.entity.TransactionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionRequestDto {
    private Long userId;
    private String targetCurrencyCode;
    private TransactionType transactionType;
    private Double amount;

}
