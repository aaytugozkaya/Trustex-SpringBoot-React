package com.example.trustex.service;

import com.example.trustex.dto.CrossTransactionRequestDto;
import com.example.trustex.dto.CrossTransactionResponseDto;

import java.util.List;

public interface CrossTransactionService {
    CrossTransactionResponseDto saveTransaction(CrossTransactionRequestDto crossTransactionRequest);
    List<CrossTransactionResponseDto> getTransactionByUserId(Long userId);
    List<CrossTransactionResponseDto> getAllTransactions();
}
