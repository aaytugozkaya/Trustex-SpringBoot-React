package com.example.trustex.dto.converter;

import com.example.trustex.dto.UserDto;
import com.example.trustex.entity.User;
import org.springframework.stereotype.Component;




@Component
public class UserDtoConverter {

    public UserDto convertToDto(User from){
        return new UserDto(
                from.getId(),
                from.getFirstname(),
                from.getLastname(),
                from.getEmail(),
                from.getMobilePhone(),
                from.getCompanyTitle(),
                from.getCorporateCustomerNumber(),
                from.getIdNumber()
        );
    }
    public User convertToEntity(UserDto from){
        return new User(
                from.getId(),
                from.getFirstname(),
                from.getLastname(),
                from.getEmail(),
                from.getMobilePhone(),
                from.getCompanyTitle(),
                from.getCorporateCustomerNumber(),
                from.getIdNumber()
        );
    }



}
