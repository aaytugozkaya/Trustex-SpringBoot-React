package com.example.trustex.dto.converter;

import com.example.trustex.dto.PersonnelCustomerDto;
import com.example.trustex.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PersonnelCustomerDtoConverter {


    public PersonnelCustomerDto convertToDto(User user) {
        PersonnelCustomerDto dto = new PersonnelCustomerDto();
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setCustomerNumber(user.getCustomerNumber());
        return dto;
    }

    public User convertToUser(PersonnelCustomerDto dto, String customerNumber) {
        User user = new User();
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setCustomerNumber(customerNumber);
        return user;
    }
}
