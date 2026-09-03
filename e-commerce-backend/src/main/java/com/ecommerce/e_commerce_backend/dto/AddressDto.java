package com.ecommerce.e_commerce_backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressDto(
        Long id,
        @NotBlank(message = "Adres başlığı boş bırakılamaz.") String title,
        @NotBlank(message = "Ad boş bırakılamaz.") String name,
        @NotBlank(message = "Soyad boş bırakılamaz.") String surname,
        @NotBlank(message = "Telefon boş bırakılamaz.") String phone,
        @NotBlank(message = "Şehir boş bırakılamaz.") String city,
        @NotBlank(message = "İlçe boş bırakılamaz.") String district,
        @NotBlank(message = "Mahalle boş bırakılamaz.") String neighborhood
) {}
