package com.example.trustex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonnelCustomerDto {
    private String firstname;
    private String lastname;
    private String customerNumber;
    private Long selectedUserId;

}
