package com.example.trustex.dto.converter;

import com.example.trustex.dto.SupportRequestDto;
import com.example.trustex.dto.UserDto;
import com.example.trustex.entity.SupportRequest;
import com.example.trustex.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class SupportRequestConverter {
    private final UserDtoConverter userDtoConverter;
    public SupportRequestDto convertToDto(SupportRequest supportRequest) {
        SupportRequestDto dto = new SupportRequestDto();
        dto.setId(supportRequest.getId());
        dto.setUserId(supportRequest.getUser().getId());
        dto.setSubject(supportRequest.getSubject());
        dto.setMessage(supportRequest.getMessage());

        UserDto userDto=userDtoConverter.convertToDto(supportRequest.getUser());
        dto.setUser(userDto);

        return dto;
    }

    public SupportRequest convertToEntity(SupportRequestDto dto) {
        SupportRequest supportRequest = new SupportRequest();
        supportRequest.setId(dto.getId());
        supportRequest.setSubject(dto.getSubject());
        supportRequest.setMessage(dto.getMessage());

        // User nesnesini oluşturmak için UserDto'dan bilgileri alıyoruz
        User user=userDtoConverter.convertToEntity(dto.getUser());
        supportRequest.setUser(user);

        return supportRequest;
    }

}
