package com.ecommerce.e_commerce_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreditCardDto(
        Long id,
        @JsonProperty("card_no")
        @NotBlank(message = "Kart numarası boş bırakılamaz.")
        String cardNumber,
        @JsonProperty("expire_month")
        @NotNull(message = "Son kullanma ayı boş bırakılamaz.")
        Integer expireMonth,
        @JsonProperty("expire_year")
        @NotNull(message = "Son kullanma yılı boş bırakılamaz.")
        Integer expireYear,
        @JsonProperty("name_on_card")
        @NotBlank(message = "Kart üzerindeki isim boş bırakılamaz.")
        String nameOnCard
) {}
