package com.example.trustex.service;

import com.example.trustex.dto.CreatePersonnelCustomerDto;
import com.example.trustex.dto.PersonnelCustomerDto;

import java.util.List;

public interface PersonnelCustomerService {
    CreatePersonnelCustomerDto addPersonnelCustomer(Long personnelId, CreatePersonnelCustomerDto createPersonelCustomerDto);

    List<PersonnelCustomerDto> getCustomerByDetails(Long personnelId, String search);
}
