package com.example.trustex.service;

import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.entity.Transaction;

import java.util.List;

public interface TransactionService {
    TransactionResponseDto saveTransaction(TransactionRequestDto transactionRequest);
    List<TransactionResponseDto> getAllTransactions ();
    List<TransactionResponseDto> getTransactionsByUserId(Long userId);
    String deleteTransaction(Long transactionId);
    TransactionResponseDto updateTransaction(Transaction transaction);
}
