package com.example.trustex.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
public class BusinessException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final List<String> errors;
    public BusinessException(HttpStatus httpStatus, List<String> errors) {
        super(String.join(", ", errors));
        this.httpStatus = httpStatus;
        this.errors = errors;
    }

}
