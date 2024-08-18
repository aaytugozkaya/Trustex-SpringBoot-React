package com.example.trustex.exception;

public class AuthenticationFailedException extends RuntimeException {
    public AuthenticationFailedException(String s) {
        super(s);
    }
}
