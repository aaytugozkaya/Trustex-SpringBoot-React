package com.example.trustex.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferRequestDto {
    private Long senderId;
    private String receiverCustomerNumber;
    private String currencyCode;
    private double amount;
}
