package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import lombok.Data;

@Data
public class AuthenticateRequestDto {
    private UserType userType;
    private String idNumber;
    private String corporateCustomerNumber;
    private String password;
    private String taxNumber;


}
