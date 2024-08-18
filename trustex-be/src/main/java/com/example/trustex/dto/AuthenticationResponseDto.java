package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

public class AuthenticationResponseDto {
    private String token;

    private long userId;
    private String customerNumber;
    private String message;
    private UserType userType;


    public AuthenticationResponseDto(String token, long userId, String message, String customerNumber, UserType userType) {
        this.token = token;
        this.userId = userId;
        this.message = message;
        this.customerNumber = customerNumber;
        this.userType=userType;
    }

    public AuthenticationResponseDto(String token) {
        this.token = token;
    }
}