package com.example.trustex.dto;

import lombok.*;

@Builder
@Getter
@Setter
public class AssetResponseDto {

    private String assetName;
    private Long userId;
    private String currencyCode;
    private String currencyLabelTR;
    private Double amount;
    private Double avgCost;
    private Double buyRate;
    private Double lastPrice;
    private Double valueInTL;

}