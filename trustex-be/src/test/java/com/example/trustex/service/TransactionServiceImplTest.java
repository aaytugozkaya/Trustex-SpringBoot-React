package com.example.trustex.service;

import com.example.trustex.dao.*;
import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.entity.*;
import com.example.trustex.exception.AmountLowerOrEqualZeroException;
import com.example.trustex.exception.BalanceNotEnoughException;
import com.example.trustex.exception.ExchangeRateNotFoundException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.TransactionService;
import com.example.trustex.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceImplTest {

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ExchangeRatesRepository exchangeRatesRepository;

    @Mock
    private CurrencyRepository currencyRepository;

    @Mock
    private AssetsRepository assetsRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }



    @Test
    public void testSaveTransaction_AmountLessThanOrEqualZero() {
        // Arrange
        Long userId = 1L;
        String targetCurrencyCode = "USD";
        double amount = -500.0; // Invalid amount
        TransactionRequestDto requestDto = new TransactionRequestDto();
        requestDto.setAmount(amount);
        requestDto.setUserId(userId);
        requestDto.setTargetCurrencyCode(targetCurrencyCode);
        requestDto.setTransactionType(TransactionType.BUY);

        // Act & Assert
        AmountLowerOrEqualZeroException thrown = assertThrows(
                AmountLowerOrEqualZeroException.class,
                () -> transactionService.saveTransaction(requestDto),
                "Expected saveTransaction() to throw AmountLowerOrEqualZeroException, but it didn't"
        );
        assertEquals("Amount must be greater than 0", thrown.getMessage());
    }

    @Test
    public void testSaveTransaction_UserNotFound() {
        // Arrange
        Long userId = 1L;
        String targetCurrencyCode = "USD";
        double amount = 500.0;

        TransactionRequestDto requestDto = new TransactionRequestDto();
        requestDto.setAmount(amount);
        requestDto.setUserId(userId);
        requestDto.setTargetCurrencyCode(targetCurrencyCode);
        requestDto.setTransactionType(TransactionType.BUY);


        // Act & Assert
        UserNotFoundException thrown = assertThrows(
                UserNotFoundException.class,
                () -> transactionService.saveTransaction(requestDto),
                "Expected saveTransaction() to throw UserNotFoundException, but it didn't"
        );
        assertEquals(userId.toString(), thrown.getMessage());
    }


}
