package com.example.trustex.dto.converter;

import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PersonnelDtoConverter {

    public PersonnelDto convertToDto(User user) {
        PersonnelDto dto = new PersonnelDto();
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setCountry(user.getCountry());
        dto.setIdNumber(user.getIdNumber());
        dto.setEmail(user.getEmail());
        dto.setMobilePhone(user.getMobilePhone());
        dto.setDateOfBirth(user.getDateOfBirth().toString()); // Eğer tarih formatı string ise

        return dto;
    }
}
