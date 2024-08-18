package com.example.trustex.controller;

import com.example.trustex.dto.ExchangeRateResponseDto;
import com.example.trustex.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static com.example.trustex.util.AppConstants.BASE_URL;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL +"/exchange-rates")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;


    @GetMapping("/latest")
    public String getLatestExchangeRate() {
        return exchangeRateService.getExchangeRateFromApi();
    }

    @GetMapping("/getExchangeRates")
    public List<ExchangeRateResponseDto> getCurrency() {
        return exchangeRateService.getExchangeRates();
    }
    @GetMapping("/getExchangeRate/{currencyCode}")
    public ExchangeRateResponseDto getCurrency(@PathVariable String currencyCode) {
        return exchangeRateService.getExchangeRateByCurrencyCode(currencyCode);
    }
    @GetMapping("/getMain")
    public ResponseEntity<List<ExchangeRateResponseDto>> getMain() {
        return ResponseEntity.ok( exchangeRateService.getMainCurrencies());
    }


    // Other endpoints can be added here
}
