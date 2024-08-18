package com.example.trustex.service;

import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.dto.UpdatePersonnelDto;

public interface PersonnelService {
    PersonnelDto getPersonnelById(Long id);


    UpdatePersonnelDto updatePersonnel(Long id, UpdatePersonnelDto updatePersonnelDto);

}
