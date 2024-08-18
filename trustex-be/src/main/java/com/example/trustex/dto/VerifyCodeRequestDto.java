package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import lombok.Data;

@Data
public class VerifyCodeRequestDto {

    private String idNumber;
    private String verificationCode;
    private String password;
    private UserType userType;



}
