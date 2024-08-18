package com.example.trustex.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;



@Data

public class SupportRequestDto {
    private Long id;

    private Long userId;

    @NotBlank(message = "Konu alanı boş bırakılamaz")
    private String subject;

    @NotBlank(message = "Mesaj alanı boş bırakılamaz")
    private String message;
    private UserDto user;

}
