package com.example.trustex.exception;

public class ExchangeRateNotFoundException extends RuntimeException {
    public ExchangeRateNotFoundException(String msg) {
        super(msg);
    }
}
