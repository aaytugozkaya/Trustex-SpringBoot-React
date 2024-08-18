package com.example.trustex.service.impl;

import com.example.trustex.dao.SupportRequestRepository;
import com.example.trustex.dto.SupportRequestDto;
import com.example.trustex.dto.converter.SupportRequestConverter;
import com.example.trustex.entity.SupportRequest;
import com.example.trustex.entity.User;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.service.SupportRequestService;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportRequestServiceImpl implements SupportRequestService {

    private final UserService userService;
    private final SupportRequestRepository supportRequestRepository;
    private final SupportRequestConverter supportRequestConverter;

    @Override
    public SupportRequestDto createSupportRequest(SupportRequestDto supportRequestDto) {
        if (supportRequestDto.getUserId() == null) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, Collections.singletonList("Kullanıcı yok"));
        }
        User user = userService.getUserById(supportRequestDto.getUserId());

        SupportRequest supportRequest = new SupportRequest();
        supportRequest.setUser(user);
        supportRequest.setSubject(supportRequestDto.getSubject());
        supportRequest.setMessage(supportRequestDto.getMessage());

        SupportRequest savedSupportRequest = supportRequestRepository.save(supportRequest);
        return supportRequestConverter.convertToDto(savedSupportRequest);
    }
    @Override
    public SupportRequestDto getSupportRequestById(Long id) {
        SupportRequest supportRequest = supportRequestRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, Collections.singletonList("Destek talebi bulunamadı")));
        return supportRequestConverter.convertToDto(supportRequest);
    }

    @Override
    public List<SupportRequestDto> getAllSupportRequests() {
        List<SupportRequest> supportRequests = supportRequestRepository.findAll();
        return supportRequests.stream()
                .map(supportRequestConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSupportRequest(Long id) {
        if (!supportRequestRepository.existsById(id)) {
            throw new BusinessException(HttpStatus.NOT_FOUND, Collections.singletonList("Destek talebi bulunamadı"));
        }
        supportRequestRepository.deleteById(id);
    }

    @Override
    public List<SupportRequestDto> getSupportRequestsByUser(Long userId) {
        List<SupportRequest> supportRequests = supportRequestRepository.findByUserId(userId);
        return supportRequests.stream()
                .map(supportRequestConverter::convertToDto)
                .collect(Collectors.toList());
    }
}
