package com.example.trustex.controller;

import com.example.trustex.dto.TransferRequestDto;
import com.example.trustex.dto.TransferResponseDto;
import com.example.trustex.entity.User;
import com.example.trustex.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    @PostMapping
    public TransferResponseDto transferFunds(@RequestBody TransferRequestDto transferRequestDTO) {
        return transferService.transferFunds(transferRequestDTO);
    }

    @GetMapping("/user/{userId}/sent")
    public List<TransferResponseDto> getUserSentTransfers(@PathVariable Long userId) {
        return transferService.getUserSentTransfers(userId);
    }


}
