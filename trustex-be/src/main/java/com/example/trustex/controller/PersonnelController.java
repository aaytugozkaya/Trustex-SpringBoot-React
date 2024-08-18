package com.example.trustex.controller;

import com.example.trustex.dto.PersonnelDto;
import com.example.trustex.dto.UpdatePersonnelDto;
import com.example.trustex.service.PersonnelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL+"/personnels")
public class PersonnelController {


    private final PersonnelService personnelService;

    @GetMapping("/{id}")
    public ResponseEntity<PersonnelDto> getPersonnelById(@PathVariable Long id) {
        PersonnelDto personnelDto = personnelService.getPersonnelById(id);
        return ResponseEntity.ok(personnelDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdatePersonnelDto> updatePersonnel(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePersonnelDto updatePersonnelDto) {
        UpdatePersonnelDto updatedPersonnelDto = personnelService.updatePersonnel(id, updatePersonnelDto);
        return ResponseEntity.ok(updatedPersonnelDto);

    }
}