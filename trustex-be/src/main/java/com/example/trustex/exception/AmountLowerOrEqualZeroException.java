package com.example.trustex.exception;

public class AmountLowerOrEqualZeroException extends RuntimeException{
    public AmountLowerOrEqualZeroException(String msg) {
        super(msg);
    }
}
