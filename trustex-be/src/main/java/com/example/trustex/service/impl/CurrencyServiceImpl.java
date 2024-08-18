package com.example.trustex.service.impl;

import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dto.CurrencyResponseDto;
import com.example.trustex.entity.Currency;
import com.example.trustex.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyRepository currencyRepository;
    public List<CurrencyResponseDto> getAllCurrencies() {
        List<Currency> currency = currencyRepository.findAll();
        List<CurrencyResponseDto> currencyResponseDtoList = new ArrayList<>();
        for (Currency currencies : currency) {
            CurrencyResponseDto currencyResponseDto = new CurrencyResponseDto();
            currencyResponseDto.setCurrencyCode(currencies.getCurrencyCode());
            currencyResponseDto.setCurrencyLabelEN(currencies.getCurrencyLabelEN());
            currencyResponseDto.setCurrencyLabelTR(currencies.getCurrencyLabelTR());
            currencyResponseDtoList.add(currencyResponseDto);
        }
        return currencyResponseDtoList;
    }
    @Override
    public Optional<Currency> findById(String currencyCode) {
        return currencyRepository.findById(currencyCode);
    }
}