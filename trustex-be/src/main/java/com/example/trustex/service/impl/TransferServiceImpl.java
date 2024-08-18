package com.example.trustex.service.impl;

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
import com.example.trustex.service.TransferService;
import com.example.trustex.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {

    private final UserService userService;
    private final AssetsService assetsService;
    private final CurrencyService currencyService;
    private final TransferRepository transferRepository;

    @Transactional
    @Override
    public TransferResponseDto transferFunds(TransferRequestDto transferRequestDTO) {
        User sender = userService.findById(transferRequestDTO.getSenderId())
                .orElseThrow(() -> new UserNotFoundException("Gönderici bulunamadı."));
        User receiver = userService.findByCustomerNumber(transferRequestDTO.getReceiverCustomerNumber())
                .orElseThrow(() -> new UserNotFoundException("Alıcı bulunamadı."));

        Currency currency = currencyService.findById(transferRequestDTO.getCurrencyCode())
                .orElseThrow(() -> new IllegalArgumentException("Böyle bir döviz türü bulunamadı."));

        Optional<Assets> senderAssetOptional = assetsService.findByUserAndCurrency(sender, currency);
        Assets senderAsset = senderAssetOptional.orElseThrow(() -> new BalanceNotEnoughException(sender.getId()));


        if (senderAsset.getAmount() < transferRequestDTO.getAmount()) {
            throw new BalanceNotEnoughException(senderAsset.getUser().getId());
        }

        if (transferRequestDTO.getAmount() <= 0){
            throw new AmountLowerOrEqualZeroException("Miktar sıfırdan küçük olamaz.");
        }else {
            senderAsset.setAmount(senderAsset.getAmount() - transferRequestDTO.getAmount());
            assetsService.saveAsset(senderAsset);
        }

        Optional<Assets> receiverAssetOptional = assetsService.findByUserAndCurrency(receiver, currency);
        Assets receiverAsset;

        if (receiverAssetOptional.isPresent()) {
            receiverAsset = receiverAssetOptional.get();
            receiverAsset.setAmount(receiverAsset.getAmount() + transferRequestDTO.getAmount());
        } else {
            receiverAsset = new Assets();
            receiverAsset.setUser(receiver);
            receiverAsset.setAssetName(transferRequestDTO.getCurrencyCode()+"Wallet");
            receiverAsset.setCurrency(currency);
            receiverAsset.setAmount(transferRequestDTO.getAmount());
            receiverAsset.setAvgCost(0.0);
        }
        assetsService.saveAsset(receiverAsset);

        Transfer transfer = new Transfer();
        transfer.setSender(sender);
        transfer.setReceiver(receiver);
        transfer.setCurrency(currency);
        transfer.setAmount(transferRequestDTO.getAmount());
        transfer.setTimestamp(LocalDateTime.now());
        transfer.setStatus("SUCCESS");
        transfer.setMessage("Transfer successful");
        transferRepository.save(transfer);

        TransferResponseDto responseDTO = new TransferResponseDto();
        responseDTO.setTransferTransactionId(transfer.getId());
        responseDTO.setSenderId(sender.getId());
        responseDTO.setReceiverCustomerNumber(receiver.getCustomerNumber());
        responseDTO.setCurrencyCode(currency.getCurrencyCode());
        responseDTO.setAmount(transfer.getAmount());
        responseDTO.setStatus(transfer.getStatus());
        responseDTO.setMessage(transfer.getMessage());

        return responseDTO;
    }

    @Override
    public List<TransferResponseDto> getUserSentTransfers(Long userId) {
        List<Transfer> transfers = transferRepository.findBySenderId(userId);
        return transfers.stream()
                .map(transfer -> {
                    TransferResponseDto dto = new TransferResponseDto();
                    dto.setTransferTransactionId(transfer.getId());
                    dto.setSenderId(transfer.getSender().getId());
                    dto.setReceiverCustomerNumber(transfer.getReceiver().getCorporateCustomerNumber() != null ? transfer.getReceiver().getCorporateCustomerNumber() : transfer.getReceiver().getCustomerNumber());
                    dto.setCurrencyCode(transfer.getCurrency().getCurrencyCode());
                    dto.setTimestamp(transfer.getTimestamp());
                    dto.setAmount(transfer.getAmount());
                    dto.setStatus(transfer.getStatus());
                    dto.setMessage(transfer.getMessage());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
