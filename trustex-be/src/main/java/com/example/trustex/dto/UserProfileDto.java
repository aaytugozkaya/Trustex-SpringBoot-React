package com.example.trustex.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor

@AllArgsConstructor
@Builder
public class UserProfileDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String idNumber;
    private String country;
    private String mobilePhone;
    private String email;
    private LocalDate dateOfBirth;
    private String customerNumber;
}
