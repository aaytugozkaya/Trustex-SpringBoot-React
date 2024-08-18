package com.example.trustex.dto;

import lombok.*;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class TransactionResponseDto {

    private Long transactionId;
    private Long userId;
    private String targetCurrencyCode;
    private String transactionType;
    private Double amount;
    private Double currencyRate;
    private Double commissionAmount;
    private Double foreignExchangeTax;
    private Double total;
    private String transactionDate;

}
