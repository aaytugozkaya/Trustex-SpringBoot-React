package com.example.trustex.validator;

import com.example.trustex.dto.RegisterRequestDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Component
public class RegisterValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

        RegisterRequestDto request = (RegisterRequestDto) target;

        if (request.getFirstname() == null || request.getFirstname().isEmpty()) {
            errors.rejectValue("firstname", "field.required", "ad zorunludur.");
        }


        if (request.getLastname() == null || request.getLastname().isEmpty()) {
            errors.rejectValue("lastname", "field.required", "Soyad zorunludur.");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "error.e_mail.notempty","Email zorunludur.");
        if (!errors.hasFieldErrors("email")) {
            if (!request.getEmail().matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
                errors.rejectValue("email", "error.e_mail.email", "Email formatında olmalıdır");
            }
        }


        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            errors.rejectValue("password", "field.required", "Şifre zorunludur.");}
         else if (request.getConfirmPassword() == null || !request.getPassword().equals(request.getConfirmPassword())){
            errors.rejectValue("confirmPassword", "field.mismatch", "Şifre doğrulaması uyuşmuyor.");
       }


        if (request.getMobilePhone() == null || request.getMobilePhone().isEmpty()) {
            errors.rejectValue("mobilePhone", "field.required", "Cep telefonu numarası zorunludur.");
        } else if (!request.getMobilePhone().matches("^\\d{10}$")) {
            errors.rejectValue("mobilePhone", "field.invalid", "Geçersiz cep telefonu numarası.");
        }


        if (request.getIdNumber() == null || request.getIdNumber().isEmpty()) {
            errors.rejectValue("idNumber", "field.required", "Kimlik numarası zorunludur.");
        } else if (!request.getIdNumber().matches("^\\d{11}$")) {
            errors.rejectValue("idNumber", "field.invalid", "Geçersiz kimlik numarası.");
        }


        if (request.getCountry() == null || request.getCountry().isEmpty()) {
            errors.rejectValue("country", "field.required", "Ülke zorunludur.");
        }

        if (request.getDateOfBirth() == null) {
            errors.rejectValue("dateOfBirth", "field.required", "Doğum tarihi zorunludur.");
        } else {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
                request.getDateOfBirth().format(formatter);
            } catch (DateTimeParseException e) {
                errors.rejectValue("dateOfBirth", "field.invalid", "Geçersiz doğum tarihi formatı. (dd.MM.yyyy olmalı)");
            }
        }



    }
}