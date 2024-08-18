package com.example.trustex.exception;

public class BalanceNotEnoughException extends RuntimeException{
    public BalanceNotEnoughException(Long userId) {
        super(userId + "Id'ye sahip kullanici yeterli bakiyeye sahip degil.");
    }

}
