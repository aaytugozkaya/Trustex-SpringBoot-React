package com.example.trustex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String mobilePhone;
    private String companyTitle;
    private String corporateCustomerNumber;
    private String idNumber;



    public UserDto(String firstname, String lastname, String email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}
