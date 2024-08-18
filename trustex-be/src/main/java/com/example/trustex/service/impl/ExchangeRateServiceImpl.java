package com.example.trustex.service.impl;

import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.ExchangeRateResponseDto;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.exception.CurrencyNotFoundException;
import com.example.trustex.service.ExchangeRateService;
import com.example.trustex.util.AppConstants;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import static com.example.trustex.util.AppConstants.API_KEY;
import static com.example.trustex.util.AppConstants.BASE_CODE;

@Service
@RequiredArgsConstructor
public class ExchangeRateServiceImpl implements ExchangeRateService {

    private final RestTemplate restTemplate;
    private final ExchangeRatesRepository exchangeRateRepository;
    private final CurrencyRepository currencyRepository;

    //Scheduled task to get exchange rates from the external API
    @Transactional
    @Scheduled(cron = "0 1 * * * ?") //
    public String getExchangeRateFromApi() {
        //Requests to external API to get exchange rates
        String url = "https://v6.exchangerate-api.com/v6/"+ API_KEY +"/latest/"+ BASE_CODE;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        if(response != null && response.get("error") != null) {
            throw new RuntimeException("Error in getting exchange rates from the API");
        }
        //Extracting the response
        Long timeLastUpdateUnix = ((Number) response.get("time_last_update_unix")).longValue();
        Map<String, Number> conversionRates = (Map<String, Number>) response.get("conversion_rates");

        //Converting the time to local time
        LocalDateTime utcDateTime  = LocalDateTime.ofEpochSecond(timeLastUpdateUnix, 0, java.time.ZoneOffset.UTC);
        ZonedDateTime utcZonedDateTime = utcDateTime.atZone(ZoneOffset.UTC);
        ZonedDateTime zonedTimeStamp = utcZonedDateTime.withZoneSameInstant(ZoneId.of("Europe/Istanbul"));
        LocalDateTime timeStamp = zonedTimeStamp.toLocalDateTime();

        //Saving the exchange rates to the database
        for (Map.Entry<String, Number> entry : conversionRates.entrySet()) {
            String currencyCode = entry.getKey();
            Double rate = entry.getValue().doubleValue();

            //Finding the currency from the database
            Currency currency = currencyRepository.findById(currencyCode).orElseThrow(()-> new RuntimeException("Currency not found"));

            ExchangeRates exchangeRate = new ExchangeRates();
            exchangeRate.setCurrency(currency);
            exchangeRate.setBuyRate(rate);
            //Setting the sell rate as 1% higher than the buy rate
            exchangeRate.setSellRate(rate * 1.01);
            exchangeRate.setTimeStamp(timeStamp);
            exchangeRateRepository.save(exchangeRate);
        }
        return "Exchange rates are updated successfully";
    }

    //Method to get the exchange rates from the database
    public List<ExchangeRateResponseDto> getExchangeRates() {
        List<ExchangeRateResponseDto> exchangeRateCurrencies = new ArrayList<>();
        //Getting the exchange rates from the database and setting them to the response DTO
        for (ExchangeRates exchangeRate : exchangeRateRepository.findByOrderLastDesc()) {
            if(!(exchangeRate.getCurrency().getCurrencyCode().equals("TRY"))) {
                exchangeRateCurrencies.add(toDto(exchangeRate));
            }
        }
        return exchangeRateCurrencies;
    }

    public ExchangeRateResponseDto getExchangeRateByCurrencyCode(String currencyCode) {
        ExchangeRates exchangeRate =  exchangeRateRepository.findNewestExchangeRateByCurrencyCode(currencyCode)
                .orElseThrow(() -> new CurrencyNotFoundException("Exchange rate not found for currency: " + currencyCode));
        return toDto(exchangeRate);
    }

    public List<ExchangeRateResponseDto> getMainCurrencies() {
        List<String> currencyCodes = Arrays.asList("USD", "EUR", "GBP", "CHF", "CAD", "RUB", "AED", "AUD", "DKK", "SEK", "NOK", "CNY", "JPY", "KWD", "INR");
        List<ExchangeRateResponseDto> exchangeRateCurrencies = new ArrayList<>();
        for (ExchangeRates exchangeRate : exchangeRateRepository.findExchangeRatesForSelectedCurrencies(currencyCodes)) {
            exchangeRateCurrencies.add(toDto(exchangeRate));
        }
        return exchangeRateCurrencies ;

    }

    private ExchangeRateResponseDto toDto(ExchangeRates exchangeRate){
        ExchangeRateResponseDto exchangeRateCurrency = new ExchangeRateResponseDto();
        exchangeRateCurrency.setCurrencyCode(exchangeRate.getCurrency().getCurrencyCode());
        exchangeRateCurrency.setCurrencyLabelTR(exchangeRate.getCurrency().getCurrencyLabelTR());
        exchangeRateCurrency.setBuyRate(exchangeRate.getBuyRate());
        exchangeRateCurrency.setSellRate(exchangeRate.getSellRate());
        exchangeRateCurrency.setTimeStamp(exchangeRate.getTimeStamp());

        return exchangeRateCurrency;
    }
}
