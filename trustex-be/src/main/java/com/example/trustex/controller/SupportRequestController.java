package com.example.trustex.controller;

import com.example.trustex.dto.SupportRequestDto;
import com.example.trustex.service.SupportRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequestMapping(BASE_URL+"/supports")
@RequiredArgsConstructor
public class SupportRequestController {
    private final SupportRequestService supportRequestService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<SupportRequestDto> createSupportRequest( @Valid @RequestBody SupportRequestDto request) {
        return ResponseEntity.ok(supportRequestService.createSupportRequest(request));
    }
    @GetMapping("/{supportRequestId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<SupportRequestDto> getSupportRequestById(@PathVariable Long supportRequestId) {
        return ResponseEntity.ok(supportRequestService.getSupportRequestById(supportRequestId));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupportRequestDto>> getAllSupportRequests() {
        return ResponseEntity.ok(supportRequestService.getAllSupportRequests());
    }
    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<SupportRequestDto>> getSupportRequestsByUser(@PathVariable Long userId){
        return ResponseEntity.ok(supportRequestService.getSupportRequestsByUser(userId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> deleteSupportRequest(@PathVariable Long id) {
        supportRequestService.deleteSupportRequest(id);
        return ResponseEntity.noContent().build();
    }

}
