package com.example.trustex.controller;

import com.example.trustex.dto.*;
import com.example.trustex.service.AuthenticationService;
import com.example.trustex.service.UserService;
import com.example.trustex.util.ErrorUtils;
import com.example.trustex.validator.LoginValidator;
import com.example.trustex.validator.RegisterValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final LoginValidator loginValidator;
    private final RegisterValidator registerValidator;
    private static final Logger logger = LogManager.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto request,BindingResult bindingResult){
        registerValidator.validate(request, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = ErrorUtils.getErrorMessages(bindingResult);
            logger.error("Validation errors: {}", errorMessages);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errorMessages));
        }

        return ResponseEntity.ok(authenticationService.register(request));
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyRegister(@RequestParam("token") String token) {
        try {
            authenticationService.verifyUser(token);
            return ResponseEntity.ok("Hesabınız başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Doğrulama sırasında bir hata oluştu.");
        }
    }
    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody AuthenticateRequestDto request, BindingResult bindingResult){
        loginValidator.validate(request, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = ErrorUtils.getErrorMessages(bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errorMessages));
        }
        return ResponseEntity.ok(authenticationService.sendVerificationCode(request));
    }
    @PostMapping("/verify-and-authenticate")
    public ResponseEntity<AuthenticationResponseDto> verifyAndAuthenticate(@RequestBody VerifyCodeRequestDto request) {
        return ResponseEntity.ok(authenticationService.verifyAndAuthenticate(request));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<String>forgotPassword(@RequestBody String email){
        authenticationService.sendResetPasswordEmail(email);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestBody
    ResetPasswordRequest request) {
            authenticationService.resetPassword(token, request);
            return ResponseEntity.ok().build();
    }
}
