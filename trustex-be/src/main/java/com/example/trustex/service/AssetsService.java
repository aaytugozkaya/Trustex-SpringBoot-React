package com.example.trustex.service;

import com.example.trustex.dto.AssetResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AssetsService {

    List<Assets> getAllAssets();

    List<Assets> getAssetsByUser(User user);

    List<AssetResponseDto> getUserAssetsInTL(Long userId);

    List<AssetResponseDto> getAssetsByUserId(Long userId);

    Assets getAssetById(Long assetId);

    Assets getAssetByUserAndCurrencyCode(User user, String currencyCode);
    AssetResponseDto getAssetByUserIdAndCurrencyCode(Long userId, String currencyCode);

    Assets saveAsset(Assets asset);

    void updateAsset(Assets asset);

    void deleteAsset(Long assetId);

    void updateAssetAmount(User user, String currencyCode, double amount);

    Optional<Assets> findByUserAndCurrency(User user, Currency currency);

    double getTotalAssetValueByUser(User user);

    double getAvgCostByUserAndCurrencyCode(User user, String currencyCode);

    double calculateTotalAssetsValueByUser(User user);

    double getTotalAssetValueInTL(Long userId);

    public double getAssetValueInTL(Assets asset);
}

