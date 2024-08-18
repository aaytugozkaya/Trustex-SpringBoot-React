package com.example.trustex.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String email) {
        super(email);
    }
}
