package com.example.trustex.dto;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrencyResponseDto {


    private String currencyCode;
    @JoinColumn(name = "currency_label_en")
    private String currencyLabelEN;
    @JoinColumn(name = "currency_label_tr")
    private String currencyLabelTR;
    @JoinColumn(name = "country_code")
    private String countryCode;
}
