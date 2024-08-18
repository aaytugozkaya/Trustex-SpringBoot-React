package com.example.trustex.controller;

import com.example.trustex.dto.CurrencyRequestDto;
import com.example.trustex.service.CurrencyConverterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CurrencyConverterController {


    private final CurrencyConverterService currencyConverterService;

    @PostMapping("/convert")
    public double convertCurrency(@RequestBody CurrencyRequestDto currencyRequestDto) {
        return currencyConverterService.convertCurrency(currencyRequestDto);
    }
}