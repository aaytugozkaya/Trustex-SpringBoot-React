package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.dto.UpdatePersonnelDto;
import com.example.trustex.dto.converter.PersonnelDtoConverter;
import com.example.trustex.dto.converter.UpdatePersonnelDtoConverter;
import com.example.trustex.entity.User;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.service.PersonnelService;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class PersonnelServiceImpl implements PersonnelService {
    private final UserRepository userRepository;
    private final PersonnelDtoConverter personnelDtoConverter;
    private final UpdatePersonnelDtoConverter updatePersonnelDtoConverter;
    private final UserService userService;
    @Override
    public PersonnelDto getPersonnelById(Long id) {
        User personnel = userRepository.findById(id).orElseThrow(() ->
        new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Personel bulunamadı")));
        return  personnelDtoConverter.convertToDto(personnel);
    }

    @Override
    public UpdatePersonnelDto updatePersonnel(Long id, UpdatePersonnelDto updatePersonnelDto) {
        User personnel = userRepository.findById(id).orElseThrow(() ->
        new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Personel bulunamadı")));

        String existingEmail = personnel.getEmail();
        String newEmail = updatePersonnelDto.getEmail();

        if (newEmail != null && !newEmail.equals(existingEmail) && userService.existsByEmail(newEmail)) {
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu Email kullanılmaktadır."));
        }

        updatePersonnelDtoConverter.updatePersonnelFromDto(personnel, updatePersonnelDto);

        userRepository.save(personnel);

        return updatePersonnelDtoConverter.convertToDto(personnel);
    }
}
