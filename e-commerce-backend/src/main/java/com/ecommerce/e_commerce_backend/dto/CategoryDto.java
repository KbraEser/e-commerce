package com.ecommerce.e_commerce_backend.dto;

public record CategoryDto(
        Long id,
        String code,
        String title,
        String img,
        Double rating,
        String gender
) {}