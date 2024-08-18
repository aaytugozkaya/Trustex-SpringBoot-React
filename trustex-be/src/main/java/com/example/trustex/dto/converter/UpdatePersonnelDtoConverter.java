package com.example.trustex.dto.converter;

import com.example.trustex.dto.UpdatePersonnelDto;
import com.example.trustex.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UpdatePersonnelDtoConverter {

    public void updatePersonnelFromDto(User personnel, UpdatePersonnelDto updatePersonnelDto) {

        personnel.setEmail(updatePersonnelDto.getEmail());
        personnel.setMobilePhone(updatePersonnelDto.getMobilePhone());

    }
    public UpdatePersonnelDto convertToDto(User personnel) {
        UpdatePersonnelDto dto = new UpdatePersonnelDto();
        dto.setEmail(personnel.getEmail());
        dto.setMobilePhone(personnel.getMobilePhone());
        return dto;
    }
}
