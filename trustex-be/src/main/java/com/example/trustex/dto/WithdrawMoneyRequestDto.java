package com.example.trustex.dto;

import com.example.trustex.entity.CurrencyCode;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WithdrawMoneyRequestDto {

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private CurrencyCode currencyCode;
}

