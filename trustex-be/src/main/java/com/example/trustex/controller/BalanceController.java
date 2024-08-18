package com.example.trustex.controller;

import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.BalanceTransactionDto;
import com.example.trustex.dto.BalanceTransactionResponseDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.service.BalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceService balanceService;

    @PostMapping("/{userId}/add-money")
    public ResponseEntity<BalanceTransactionResponseDto> addMoneyToAsset(
            @PathVariable("userId") Long userId,
            @RequestBody AddMoneyRequestDto addMoneyRequestDto) {
        return ResponseEntity.ok(balanceService.addMoneyToAsset(userId, addMoneyRequestDto));
    }

    @PostMapping("/{userId}/withdraw-money")
    public ResponseEntity<BalanceTransactionResponseDto> withdrawMoneyFromTRYAsset(
            @PathVariable("userId") Long userId,
            @RequestBody WithdrawMoneyRequestDto withdrawMoneyRequestDto) {
        return ResponseEntity.ok(balanceService.withdrawMoneyFromAsset(userId,withdrawMoneyRequestDto));
    }

    @GetMapping("/{userId}/balance-transactions")
    public ResponseEntity<List<BalanceTransactionDto>> getUserBalanceTransactions(@PathVariable Long userId){
        List<BalanceTransactionDto> transactions = balanceService.getUserBalanceTransactions(userId);
        return ResponseEntity.ok(transactions);
    }
}

