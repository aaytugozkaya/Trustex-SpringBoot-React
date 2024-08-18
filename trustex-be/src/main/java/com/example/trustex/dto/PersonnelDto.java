package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@EqualsAndHashCode
public class PersonnelDto {

    private String firstname;
    private String lastname;
    private String country;
    private String idNumber;
    private String email;
    private String mobilePhone;
    private String dateOfBirth;

}
