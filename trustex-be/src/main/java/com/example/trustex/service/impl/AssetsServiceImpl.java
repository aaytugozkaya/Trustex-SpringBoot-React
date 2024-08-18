package com.example.trustex.service.impl;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dao.ExchangeRatesRepository;
import com.example.trustex.dto.AssetResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.ExchangeRates;
import com.example.trustex.entity.User;
import com.example.trustex.exception.AssetNotFoundException;
import com.example.trustex.exception.CurrencyNotFoundException;
import com.example.trustex.service.AssetsService;
import com.example.trustex.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetsServiceImpl implements AssetsService {

    private final AssetsRepository assetsRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final CurrencyRepository currencyRepository;
    private final UserService userService;

    @Override
    public List<Assets> getAllAssets() {
        return assetsRepository.findAll();
    }

    @Override
    public List<Assets> getAssetsByUser(User user) {
        return assetsRepository.findByUser(user);
    }

    @Override
    public List<AssetResponseDto> getUserAssetsInTL(Long userId) {
        User user = userService.getUserById(userId);
        List<Assets> assets = assetsRepository.findByUser(user);

        return assets.stream()
                .filter(asset -> asset.getAmount() > 0) // Filter out assets with amount 0
                .map(asset -> {
                    ExchangeRates exchangeRates = exchangeRatesRepository
                            .findNewestExchangeRateByCurrencyCode(asset.getCurrency().getCurrencyCode())
                            .orElseThrow(() -> new RuntimeException("Currency Not Found for code: " + asset.getCurrency().getCurrencyCode()));

                    double valueInTL = asset.getCurrency().getCurrencyCode().equals("TRY")
                            ? asset.getAmount()
                            : asset.getAmount() * (1 / exchangeRates.getBuyRate());

                    return AssetResponseDto.builder()
                            .assetName(asset.getAssetName())
                            .userId(userId)
                            .currencyCode(asset.getCurrency().getCurrencyCode())
                            .currencyLabelTR(asset.getCurrency().getCurrencyLabelTR())
                            .amount(asset.getAmount())
                            .buyRate(1 / exchangeRates.getBuyRate())
                            .avgCost(asset.getAvgCost())
                            .lastPrice(1 / exchangeRates.getSellRate())
                            .valueInTL(valueInTL)
                            .build();
                })
                .collect(Collectors.toList());
    }


    @Override
    public List<AssetResponseDto> getAssetsByUserId(Long userId) {
        List<AssetResponseDto> assetResponseDtos = new ArrayList<>();
        for (Assets assets : assetsRepository.findByUserId(userId)) {
            assetResponseDtos.add(toDto(assets));
        }
        return assetResponseDtos;
    }

    @Override
    public double getTotalAssetValueInTL(Long userId) {
        User user = userService.getUserById(userId);
        List<Assets> assets = assetsRepository.findByUser(user);
        double totalValueInTL = 0.0;
        for (Assets asset : assets) {
            double valueInTL;
            if (asset.getCurrency().getCurrencyCode().equals("TRY")) {
                valueInTL = asset.getAmount();
            } else {
                ExchangeRates exchangeRate = asset.getCurrency().getExchangeRates().get(0);
                valueInTL = asset.getAmount() * exchangeRate.getBuyRate();
            }
            totalValueInTL += valueInTL;
        }
        return totalValueInTL;
    }

    @Override
    public double getAssetValueInTL(Assets asset) {
        double valueInTL;
        if (asset.getCurrency().getCurrencyCode().equals("TRY")) {
            valueInTL = asset.getAmount();
        } else {
            ExchangeRates exchangeRate = asset.getCurrency().getExchangeRates().get(0);
            valueInTL = asset.getAmount() * exchangeRate.getBuyRate();
        }
        return valueInTL;
    }


    private AssetResponseDto toDto(Assets assets) {
        return AssetResponseDto.builder()
                .assetName(assets.getAssetName())
                .userId(assets.getUser().getId())
                .currencyCode(assets.getCurrency().getCurrencyCode())
                .amount(assets.getAmount())
                .avgCost(assets.getAvgCost())
                .build();
    }

    @Override
    public Assets getAssetById(Long id) {
        return assetsRepository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + id));
    }

    @Override
    public Assets getAssetByUserAndCurrencyCode(User user, String currencyCode) {
        return assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
    }

    @Override
    public AssetResponseDto getAssetByUserIdAndCurrencyCode(Long userId, String currencyCode) {
        User user = userService.getUserById(userId);
       Assets asset = assetsRepository.findByUserAndCurrencyCode(userId, currencyCode)
                .orElseGet(() -> createAssetForUser(user, currencyCode));

        return AssetResponseDto.builder()
                .assetName(asset.getAssetName())
                .userId(asset.getUser().getId())
                .currencyCode(asset.getCurrency().getCurrencyCode())
                .amount(asset.getAmount())
                .avgCost(asset.getAvgCost())
                .build();
    }

    @Override
    public Assets saveAsset(Assets asset) {
        Currency currency = currencyRepository.findById(asset.getCurrency().getCurrencyCode())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı: " + asset.getCurrency().getCurrencyCode()));
        asset.setCurrency(currency);
        asset.setAssetName(asset.getCurrency().getCurrencyCode().toString() + "Walllet");
        return assetsRepository.save(asset);
    }

    @Override
    public void updateAsset(Assets asset) {
        Currency currency = currencyRepository.findById(asset.getCurrency().getCurrencyCode())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı: " + asset.getCurrency().getCurrencyCode()));
        asset.setCurrency(currency);
        if (!assetsRepository.existsById(asset.getId())) {
            throw new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + asset.getId());
        }
        assetsRepository.save(asset);
    }

    @Override
    public void deleteAsset(Long id) {
        if (!assetsRepository.existsById(id)) {
            throw new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + id);
        }
        assetsRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateAssetAmount(User user, String currencyCode, double amount) {
        Assets asset = assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
        asset.setAmount(asset.getAmount() + amount);
        assetsRepository.save(asset);
    }

    @Override
    public Optional<Assets> findByUserAndCurrency(User user, Currency currency) {
        return assetsRepository.findByUserAndCurrency(user, currency);
    }

    @Override
    public double getTotalAssetValueByUser(User user) {
        List<Assets> assets = assetsRepository.findByUser(user);
        return assets.stream()
                .mapToDouble(asset -> asset.getAmount() * asset.getAvgCost())
                .sum();
    }

    @Override
    public double getAvgCostByUserAndCurrencyCode(User user, String currencyCode) {
        Assets asset = assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
        return asset.getAvgCost();
    }

    @Override
    public double calculateTotalAssetsValueByUser(User user) {
        List<Assets> assets = getAssetsByUser(user);
        return assets.stream()
                .mapToDouble(asset -> asset.getAmount() * asset.getAvgCost())
                .sum();
    }

    private Assets createAssetForUser(User user, String currencyCode) {
        //If no asset is found in demanded currency , create one for the user.
        Assets newTransactionAsset = Assets.builder()
                .assetName(currencyCode + "Wallet")
                .amount(0.0)
                .avgCost(0.0)
                .currency(currencyRepository.findById(currencyCode).orElseThrow(() -> new IllegalArgumentException(currencyCode + " currency not found")))
                .user(user)
                .build();
        assetsRepository.save(newTransactionAsset);
        return newTransactionAsset;
    }
}
