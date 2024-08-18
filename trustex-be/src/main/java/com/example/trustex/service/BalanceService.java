package com.example.trustex.service;

import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.BalanceTransactionDto;
import com.example.trustex.dto.BalanceTransactionResponseDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.entity.BalanceTransactionType;
import com.example.trustex.entity.CurrencyCode;
import com.example.trustex.entity.User;

import java.util.List;

public interface BalanceService {
    BalanceTransactionResponseDto addMoneyToAsset(Long userId, AddMoneyRequestDto request);
    BalanceTransactionResponseDto withdrawMoneyFromAsset(Long userId, WithdrawMoneyRequestDto request);
    List<BalanceTransactionDto> getUserBalanceTransactions(Long userId);
}
