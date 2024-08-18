package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.service.NumberGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class NumberGeneratorServiceImpl implements NumberGeneratorService {


    private final UserRepository userRepository;
    @Override
    public String generateUniqueCustomerNumber() {
        String number;
        do {
            number = generateRandomNumber();
        } while (userRepository.existsByCustomerNumber(number));
        return number;
    }
    @Override
    public String generateRandomNumber() {
        Random random = new Random();
        long number = 10000000000L + random.nextLong(90000000000L);
        return String.valueOf(number);
    }
}