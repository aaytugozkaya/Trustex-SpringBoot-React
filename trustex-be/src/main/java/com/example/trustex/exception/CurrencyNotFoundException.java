package com.example.trustex.exception;

public class CurrencyNotFoundException extends RuntimeException{
    public CurrencyNotFoundException(String msg) {
        super(msg);
    }
}
