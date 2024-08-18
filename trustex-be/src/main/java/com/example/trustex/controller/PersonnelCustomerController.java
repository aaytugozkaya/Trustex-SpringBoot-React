package com.example.trustex.controller;

import com.example.trustex.dto.CreatePersonnelCustomerDto;
import com.example.trustex.dto.PersonnelCustomerDto;
import com.example.trustex.service.PersonnelCustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL+"/personnel-customers")
public class PersonnelCustomerController {
    private final PersonnelCustomerService personnelCustomerService;

    @PostMapping
    public ResponseEntity<CreatePersonnelCustomerDto> addPersonnelCustomer(@RequestParam Long personnelId, @Valid @RequestBody CreatePersonnelCustomerDto createPersonnelCustomerDto) {
        CreatePersonnelCustomerDto response = personnelCustomerService.addPersonnelCustomer(personnelId, createPersonnelCustomerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{personnelId}/customer")
    public ResponseEntity<List<PersonnelCustomerDto>> getCustomerByDetails(
            @PathVariable Long personnelId,
            @RequestParam String search) {
        List<PersonnelCustomerDto> customerDtos = personnelCustomerService.getCustomerByDetails(personnelId, search);
        return ResponseEntity.ok(customerDtos);
    }
}
