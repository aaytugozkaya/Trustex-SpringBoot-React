package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRelationshipRepository;
import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.CreatePersonnelCustomerDto;
import com.example.trustex.dto.PersonnelCustomerDto;
import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.dto.converter.CreatePersonnelCustomerDtoConverter;

import com.example.trustex.dto.converter.PersonnelCustomerDtoConverter;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserRelationship;
import com.example.trustex.entity.UserType;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.service.NumberGeneratorService;
import com.example.trustex.service.PersonnelCustomerService;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonnelCustomerServiceImpl implements PersonnelCustomerService {

    private final UserService userService;
    private final UserRelationshipRepository userRelationshipRepository;
    private final NumberGeneratorService numberGeneratorService;
    private  final CreatePersonnelCustomerDtoConverter createPersonnelCustomerDtoConverter;
    private final UserRepository userRepository;
    private final PersonnelCustomerDtoConverter personnelCustomerDtoConverter;
    @Override
    public CreatePersonnelCustomerDto addPersonnelCustomer(Long personnelId, CreatePersonnelCustomerDto createPersonnelCustomerDto) {
        createPersonnelCustomerDto.setUserType(UserType.PERSONNEL_CUSTOMER);
        // PERSONNEL tipindeki kullanıcıyı bul
        User personnel = userService.getUserById(personnelId);
        if (!personnel.getUserType().equals(UserType.PERSONNEL)) {
            throw new IllegalArgumentException("kullanıcı tipi geçersiz.");
        }


        if (createPersonnelCustomerDto.getUserType() == UserType.INDIVIDUAL && userRepository.existsByIdNumberAndUserType(createPersonnelCustomerDto.getIdNumber(), UserType.PERSONNEL_CUSTOMER)) {
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu kimlik numarası zaten personel müşterisi olarak kayıtlı. Aynı kimlik numarasıyla bireysel müşteri kaydı yapılamaz."));
        }

        if (createPersonnelCustomerDto.getUserType() == UserType.PERSONNEL_CUSTOMER && userRepository.existsByIdNumberAndUserType(createPersonnelCustomerDto.getIdNumber(), UserType.INDIVIDUAL)) {
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu kimlik numarası zaten bireysel müşteri olarak kayıtlı. Aynı kimlik numarasıyla personel müşteri kaydı yapılamaz. Lütfen müşteriyle iletişime geçin."));
        }


        if(userService.existsByEmail(createPersonnelCustomerDto.getEmail())){
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu Email adresine kayıtlı kullanıcı bulunmaktadır"));
        }
        if(userRepository.existsByIdNumberAndUserType(createPersonnelCustomerDto.getIdNumber(),createPersonnelCustomerDto.getUserType())){
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu kimlik numarasına kayıtlı kullanıcı türü zaten mevcut."));
        }

        if (userRelationshipRepository.existsByPersonnelCustomerIdNumber(createPersonnelCustomerDto.getIdNumber())) {
            throw new BusinessException(HttpStatus.CONFLICT, Collections.singletonList("Bu müşteri zaten bir personel tarafından eklenmiş."));
        }

        String customerNumber = numberGeneratorService.generateUniqueCustomerNumber();

        User personnelCustomer = createPersonnelCustomerDtoConverter.convertToUser(createPersonnelCustomerDto, customerNumber);

        userRepository.save(personnelCustomer);

        UserRelationship relationship = new UserRelationship();
        relationship.setPersonnel(personnel);
        relationship.setPersonnelCustomer(personnelCustomer);
        userRelationshipRepository.save(relationship);

        return createPersonnelCustomerDtoConverter.convertToDto(personnelCustomer);
    }

    @Override
    public List<PersonnelCustomerDto> getCustomerByDetails(Long personnelId,  String search) {
        User personnel = userService.getUserById(personnelId);
        if (!personnel.getUserType().equals(UserType.PERSONNEL)) {
            throw new IllegalArgumentException("kullanıcı tipi geçersiz.");
        }

        List<UserRelationship> relationships = userRelationshipRepository
                .findByDetails(personnelId,search);

        List<Long> customerIds = relationships.stream()
                .map(UserRelationship::getPersonnelCustomer)
                .map(User::getId)
                .collect(Collectors.toList());

        List<User> customers = userRepository.findAllById(customerIds);

        return customers.stream()
                .map(customer -> new PersonnelCustomerDto(
                        customer.getFirstname(),
                        customer.getLastname(),
                        customer.getCustomerNumber(),
                        customer.getId()
                ))
                .collect(Collectors.toList());
    }



}
