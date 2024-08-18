package com.example.trustex.service;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.dto.UpdatePersonnelDto;
import com.example.trustex.dto.converter.PersonnelDtoConverter;
import com.example.trustex.dto.converter.UpdatePersonnelDtoConverter;
import com.example.trustex.entity.User;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.service.impl.PersonnelServiceImpl;
import org.hibernate.sql.Update;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PersonnelServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PersonnelDtoConverter personnelDtoConverter;
    @Mock
    private UpdatePersonnelDtoConverter updatePersonnelDtoConverter;
    @Mock
    private UserService userService;
    @InjectMocks
    private PersonnelServiceImpl personnelService;
    private  UpdatePersonnelDto updatePersonnelDto;
    private User user;
    private  PersonnelDto personnelDto;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setEmail("test@example.com");
        user.setFirstname("John");
        user.setLastname("Doe");
        user.setCountry("Country");
        user.setIdNumber("123456");
        user.setMobilePhone("1234567890");
        user.setDateOfBirth(null);

        updatePersonnelDto = new UpdatePersonnelDto();
        updatePersonnelDto.setEmail("newemail@example.com");
        updatePersonnelDto.setMobilePhone("0987654321");

        personnelDto = new PersonnelDto();
        personnelDto.setFirstname("John");
        personnelDto.setLastname("Doe");
        personnelDto.setCountry("Country");
        personnelDto.setIdNumber("123456");
        personnelDto.setEmail("test@example.com");
        personnelDto.setMobilePhone("1234567890");
        personnelDto.setDateOfBirth("01-01-2000");
    }
    @Test
    public void testGetPersonnelById_Success() {
        Long id = 1L;
        User user = new User();
        PersonnelDto personnelDto = new PersonnelDto();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(personnelDtoConverter.convertToDto(user)).thenReturn(personnelDto);

        PersonnelDto result = personnelService.getPersonnelById(id);

        assertNotNull(result);
        assertEquals(personnelDto, result);
        verify(userRepository, times(1)).findById(id);
        verify(personnelDtoConverter, times(1)).convertToDto(user);
    }

    @Test
    public void testGetPersonnelById_NotFound() {
        Long id = 1L;

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        BusinessException thrown = assertThrows(BusinessException.class, () -> {
            personnelService.getPersonnelById(id);
        });

        assertEquals(HttpStatus.BAD_REQUEST, thrown.getHttpStatus());
        assertEquals(Collections.singletonList("Personel bulunamadı"), thrown.getErrors());
        verify(userRepository, times(1)).findById(id);
    }

    @Test
    public void testUpdatePersonnel_Success() {
        Long id = 1L;
        updatePersonnelDto.setEmail("example@example.com");


        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userService.existsByEmail(updatePersonnelDto.getEmail())).thenReturn(false);
        when(updatePersonnelDtoConverter.convertToDto(user)).thenReturn(updatePersonnelDto);

        UpdatePersonnelDto result = personnelService.updatePersonnel(id, updatePersonnelDto);

        assertNotNull(result);
        assertEquals(updatePersonnelDto, result);
        verify(userRepository, times(1)).findById(id);
        verify(userService, times(1)).existsByEmail(updatePersonnelDto.getEmail());
        verify(updatePersonnelDtoConverter, times(1)).updatePersonnelFromDto(user, updatePersonnelDto);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testUpdatePersonnel_EmailConflict() {
        Long id = 1L;
        updatePersonnelDto.setEmail("conflict@example.com");



        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userService.existsByEmail(updatePersonnelDto.getEmail())).thenReturn(true);

        BusinessException thrown = assertThrows(BusinessException.class, () -> {
            personnelService.updatePersonnel(id, updatePersonnelDto);
        });

        assertEquals(HttpStatus.CONFLICT, thrown.getHttpStatus());
        assertEquals(Collections.singletonList("Bu Email kullanılmaktadır."), thrown.getErrors());
        verify(userRepository).findById(id);
        verify(userService).existsByEmail(updatePersonnelDto.getEmail());
        verifyNoMoreInteractions(updatePersonnelDtoConverter, userRepository);
    }

}
