package com.example.trustex.service;

import com.example.trustex.dto.TransferRequestDto;
import com.example.trustex.dto.TransferResponseDto;

import java.util.List;

public interface TransferService {
    TransferResponseDto transferFunds(TransferRequestDto transferRequestDTO);
    public List<TransferResponseDto> getUserSentTransfers(Long userId);
}
