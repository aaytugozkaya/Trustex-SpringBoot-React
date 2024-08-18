package com.example.trustex.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TransferResponseDto {
    private Long transferTransactionId;
    private Long senderId;
    private String receiverCustomerNumber;
    private String currencyCode;
    private double amount;
    private LocalDateTime timestamp;
    private String status;
    private String message;
}