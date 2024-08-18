package com.example.trustex.dto;

import com.example.trustex.entity.CurrencyCode;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddMoneyRequestDto {

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private CurrencyCode currencyCode;
}
