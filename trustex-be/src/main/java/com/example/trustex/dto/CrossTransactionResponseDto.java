package com.example.trustex.dto;

import lombok.*;

@Builder
@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CrossTransactionResponseDto {

    private Long crossTransactionId;
    private Long userId;
    private String baseCurrencyCode;
    private String targetCurrencyCode;
    private Double amount;
    private Double currencyRate;
    private Double commissionAmount;
    private Double foreignExchangeTax;
    private Double total;
    private String transactionDate;
}
