package com.example.trustex.controller;

import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.entity.Transaction;
import com.example.trustex.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL+"/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<TransactionResponseDto>> getTransactionsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getTransactionsByUserId(userId));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @PostMapping("/buySell")
    public ResponseEntity<TransactionResponseDto> saveTransaction(@RequestBody TransactionRequestDto transactionRequest) {
        return ResponseEntity.ok(transactionService.saveTransaction(transactionRequest));
    }

    @DeleteMapping("/delete/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long transactionId) {
        return ResponseEntity.ok(transactionService.deleteTransaction(transactionId));
    }

    @PutMapping("/update")
    public ResponseEntity<TransactionResponseDto> updateTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(transactionService.updateTransaction(transaction));
    }
}
