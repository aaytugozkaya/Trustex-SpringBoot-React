package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
@Data
@Getter
@Setter
public class CreatePersonnelCustomerDto {

    @NotBlank(message = "İsim boş olamaz.")
    private String firstname;
    @NotBlank(message = "Soyad boş olamaz.")
    private String lastname;
    @NotBlank(message = "Email boş olamaz.")
    @Email(message = "Geçerli bir email adresi girin.")
    private String email;

    @NotBlank(message = "Kimlik No boş olamaz.")
    @Pattern(regexp = "\\d{11}", message = "Geçerli bir kimlik numarası giriniz.")
    private String idNumber;
    @NotBlank(message = "Ülke boş olamaz.")
    private String country;

    @NotNull(message = "Doğum tarihi boş olamaz.")
    @Past(message = "Doğum tarihi geçmiş bir tarih olmalıdır.")
    private LocalDate dateOfBirth;
    private UserType userType;
    @Pattern(regexp = "^[0-9]{10}$", message = "Geçerli bir telefon numarası giriniz.")
    private String mobilePhone;



}
