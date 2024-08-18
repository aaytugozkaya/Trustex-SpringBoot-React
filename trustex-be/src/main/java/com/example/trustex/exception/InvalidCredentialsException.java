package com.example.trustex.exception;


public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String e) {
        super(e);
    }
}
