package com.example.trustex.dto.converter;

import com.example.trustex.dto.CreatePersonnelCustomerDto;
import com.example.trustex.entity.Role;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import org.springframework.stereotype.Component;

@Component
public class CreatePersonnelCustomerDtoConverter {
    public CreatePersonnelCustomerDto convertToDto(User user) {
        CreatePersonnelCustomerDto dto = new CreatePersonnelCustomerDto();
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setEmail(user.getEmail());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setIdNumber(dto.getIdNumber());
        dto.setCountry(user.getCountry());
        dto.setMobilePhone(user.getMobilePhone());
        return dto;
    }

    public User convertToUser(CreatePersonnelCustomerDto createPersonnelCustomerDto, String customerNumber) {
        User user = new User();
        user.setFirstname(createPersonnelCustomerDto.getFirstname());
        user.setLastname(createPersonnelCustomerDto.getLastname());
        user.setEmail(createPersonnelCustomerDto.getEmail());
        user.setUserType(UserType.PERSONNEL_CUSTOMER);
        user.setIdNumber(createPersonnelCustomerDto.getIdNumber());
        user.setMobilePhone(createPersonnelCustomerDto.getMobilePhone());
        user.setDateOfBirth(createPersonnelCustomerDto.getDateOfBirth());
        user.setCountry(createPersonnelCustomerDto.getCountry());
        user.setCustomerNumber(customerNumber);
        user.setVerified(true); // PERSONNEL_CUSTOMER otomatik olarak doğrulanmış olabilir
        user.setRole(Role.USER);
        return user;
    }
}
