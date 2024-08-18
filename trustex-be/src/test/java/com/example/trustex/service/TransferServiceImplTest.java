package com.example.trustex.service;

import com.example.trustex.dao.TransferRepository;
import com.example.trustex.dto.TransferRequestDto;
import com.example.trustex.dto.TransferResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.Transfer;
import com.example.trustex.entity.User;
import com.example.trustex.exception.AmountLowerOrEqualZeroException;
import com.example.trustex.exception.BalanceNotEnoughException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.AssetsService;
import com.example.trustex.service.CurrencyService;
import com.example.trustex.service.UserService;
import com.example.trustex.service.impl.TransferServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransferServiceImplTest {

    @Mock
    private UserService userService;

    @Mock
    private AssetsService assetsService;

    @Mock
    private CurrencyService currencyService;

    @Mock
    private TransferRepository transferRepository;

    @InjectMocks
    private TransferServiceImpl transferService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void transferFunds_ShouldTransferSuccessfully() {
        // Arrange
        TransferRequestDto transferRequestDto = new TransferRequestDto();
        transferRequestDto.setSenderId(1L);
        transferRequestDto.setReceiverCustomerNumber("12345");
        transferRequestDto.setCurrencyCode("USD");
        transferRequestDto.setAmount(1000.00);

        User sender = new User();
        sender.setId(1L);

        User receiver = new User();
        receiver.setCustomerNumber("12345");

        Currency currency = new Currency();
        currency.setCurrencyCode("USD");

        Assets senderAssets = new Assets();
        senderAssets.setAmount(2000.00); // Gönderenin bakiyesi 2000 USD

        Assets receiverAssets = new Assets();
        receiverAssets.setAmount(500.00); // Alıcının bakiyesi 500 USD

        when(userService.findById(1L)).thenReturn(Optional.of(sender));
        when(userService.findByCustomerNumber("12345")).thenReturn(Optional.of(receiver));
        when(currencyService.findById("USD")).thenReturn(Optional.of(currency));
        when(assetsService.findByUserAndCurrency(sender, currency)).thenReturn(Optional.of(senderAssets));
        when(assetsService.findByUserAndCurrency(receiver, currency)).thenReturn(Optional.of(receiverAssets));

        // Act
        transferService.transferFunds(transferRequestDto);

        // Assert
        verify(assetsService, times(2)).saveAsset(any(Assets.class));
        // İlk doğrulama sender'ın bakiyesini düşürmek için, ikinci doğrulama ise receiver'ın bakiyesini artırmak için.
    }


    @Test
    void transferFunds_ShouldThrowUserNotFoundException_ForInvalidSender() {
        // Arrange
        TransferRequestDto transferRequestDto = new TransferRequestDto();
        transferRequestDto.setSenderId(1L);
        transferRequestDto.setReceiverCustomerNumber("12345");
        transferRequestDto.setCurrencyCode("USD");
        transferRequestDto.setAmount(100.0);

        when(userService.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> transferService.transferFunds(transferRequestDto));
    }

    @Test
    void transferFunds_ShouldThrowBalanceNotEnoughException_ForInsufficientBalance() {
        // Arrange
        TransferRequestDto transferRequestDto = new TransferRequestDto();
        transferRequestDto.setSenderId(1L);
        transferRequestDto.setReceiverCustomerNumber("12345");
        transferRequestDto.setCurrencyCode("USD");
        transferRequestDto.setAmount(1000.00);

        User sender = new User();
        sender.setId(1L);

        User receiver = new User();
        receiver.setCustomerNumber("12345");

        Currency currency = new Currency();
        currency.setCurrencyCode("USD");

        // Mock Assets with User
        Assets senderAssets = new Assets();
        senderAssets.setAmount(500.00); // Bakiye 500 TL, ama 1000 TL transfer edilmeye çalışılıyor
        senderAssets.setUser(sender);   // Burada sender User'ı ekleniyor

        when(userService.findById(1L)).thenReturn(Optional.of(sender));
        when(userService.findByCustomerNumber("12345")).thenReturn(Optional.of(receiver));
        when(currencyService.findById("USD")).thenReturn(Optional.of(currency));
        when(assetsService.findByUserAndCurrency(sender, currency)).thenReturn(Optional.of(senderAssets));

        // Act & Assert
        assertThrows(BalanceNotEnoughException.class, () -> transferService.transferFunds(transferRequestDto));
    }



    @Test
    void getUserSentTransfers_ShouldReturnTransferList() {
        // Arrange
        Long userId = 1L;

        User sender = new User();
        sender.setId(userId);

        User receiver = new User();
        receiver.setId(2L);
        receiver.setCustomerNumber("12345");

        Currency currency = new Currency();
        currency.setCurrencyCode("USD");

        Transfer transfer = new Transfer();
        transfer.setSender(sender);
        transfer.setReceiver(receiver);
        transfer.setCurrency(currency); // Currency alanını set edin
        transfer.setId(1L);

        when(transferRepository.findBySenderId(userId)).thenReturn(List.of(transfer));

        // Act
        List<TransferResponseDto> result = transferService.getUserSentTransfers(userId);

        // Assert
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1L, result.get(0).getTransferTransactionId());
        verify(transferRepository, times(1)).findBySenderId(userId);
    }


}