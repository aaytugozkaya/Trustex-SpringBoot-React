package com.example.trustex.dto;

import com.example.trustex.entity.TransactionType;
import lombok.*;

@Builder
@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CrossTransactionRequestDto {

    private Long userId;
    private String targetCurrencyCode;
    private String baseCurrencyCode;
    private Double amount;

}
