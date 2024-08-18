package com.example.trustex.exception;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, List<String>>> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("errors", errors));
    }
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<Map<String, List<String>>> handleInvalidInputException(InvalidInputException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errors));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, List<String>>> handleUserNofFoundException(UserNotFoundException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("errors", errors));
    }
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationException(ValidationException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("errors", errors));
    }

    @ExceptionHandler(AuthenticationFailedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<String> handleAuthenticationFailedException(AuthenticationFailedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(BalanceNotEnoughException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBalanceNotEnoughException(BalanceNotEnoughException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ExchangeRateNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> ExchangeRateNotFoundException(ExchangeRateNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(CurrencyNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> CurrencyNotFoundException(CurrencyNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String, List<String>>> handleBusinessException(BusinessException ex) {
        logger.error("BusinessException occurred: {}", ex.getErrors());
        return ResponseEntity.status(ex.getHttpStatus()).body(Map.of("errors", ex.getErrors()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getDefaultMessage())
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, List<String>>> handleAllExceptions(Exception ex) {
        logger.error("Exception occurred: {}", ex.getMessage());
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(status).body(Map.of("errors", errors));
    }

}