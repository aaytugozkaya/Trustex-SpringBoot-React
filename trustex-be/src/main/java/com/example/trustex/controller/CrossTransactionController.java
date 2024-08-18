package com.example.trustex.controller;

import com.example.trustex.dto.CrossTransactionRequestDto;
import com.example.trustex.dto.CrossTransactionResponseDto;
import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.service.CrossTransactionService;
import com.example.trustex.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL+"/crossTransactions")
public class CrossTransactionController {

    private final CrossTransactionService crossTransactionService;

    @PostMapping("/buySell")
    public ResponseEntity<CrossTransactionResponseDto> saveTransaction(@RequestBody CrossTransactionRequestDto crossTransactionRequest) {
        return ResponseEntity.ok(crossTransactionService.saveTransaction(crossTransactionRequest));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CrossTransactionResponseDto>> getAllTransactions() {
        return ResponseEntity.ok(crossTransactionService.getAllTransactions());
    }

    @GetMapping("/getAllByUserId/{userId}")
    public ResponseEntity<List<CrossTransactionResponseDto>> getAllTransactionsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(crossTransactionService.getTransactionByUserId(userId));
    }




}
