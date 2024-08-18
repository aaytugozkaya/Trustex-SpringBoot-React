package com.example.trustex.dto;

import lombok.Data;

@Data
public class ForgotPasswordDto {

    private String password;

    private String confirmPassword;

    private String email;
}
