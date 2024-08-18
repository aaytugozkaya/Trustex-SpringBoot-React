package com.example.trustex.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrencyRequestDto {

    private double amount;
    private String base;
    private String target;


}
