package com.ecommerce.e_commerce_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Ad alanı boş bırakılamaz.")
        @Size(min = 3, message = "İsim en az 3 karakter olmalıdır.")
        String name,
        @NotBlank(message = "Email alanı boş bırakılamaz.")
        @Email(message = "Geçerli bir email giriniz.")
        String email,
        @NotBlank(message = "Şifre alanı boş bırakılamaz.")
        @Size(min = 8, max = 20, message = "Şifre en az 8, en fazla 20 karakter olmalıdır.")
        String password,
        @NotBlank(message = "Şifre tekrarı boş bırakılamaz.")
        String passwordConfirm,
        @NotNull(message = "Rol seçilmelidir.")
        Long role_id

) {}
