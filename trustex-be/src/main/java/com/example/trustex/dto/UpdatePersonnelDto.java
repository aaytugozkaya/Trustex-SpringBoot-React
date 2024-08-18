package com.example.trustex.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdatePersonnelDto {
    @Email(message = "Geçerli bir email adresi girin.")
    private String email;
    @Pattern(regexp = "^[0-9]{10}$", message = "Geçerli bir telefon numarası giriniz.")
    private String mobilePhone;

}
