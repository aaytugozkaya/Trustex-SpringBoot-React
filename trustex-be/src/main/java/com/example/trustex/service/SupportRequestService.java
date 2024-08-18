package com.example.trustex.service;

import com.example.trustex.dto.SupportRequestDto;

import java.util.List;

public interface  SupportRequestService {
    SupportRequestDto createSupportRequest(SupportRequestDto request);
    SupportRequestDto getSupportRequestById(Long id);
    List<SupportRequestDto> getAllSupportRequests();
    void deleteSupportRequest(Long id);

    List<SupportRequestDto> getSupportRequestsByUser(Long userId);
}
