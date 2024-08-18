package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequestDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    private String confirmPassword;
    private String mobilePhone;

    private String idNumber;
    private String country;
    private LocalDate dateOfBirth;

    @NotNull
    private UserType userType;
    private String corporateCustomerNumber;
    private String representativeIdNumber; // Şirket yetkilisine ait TC kimlik numarası
    private String commercialRegistrationNumber;
    private String mersisNumber;
    private String companyTitle;
    private String taxNumber;


}
