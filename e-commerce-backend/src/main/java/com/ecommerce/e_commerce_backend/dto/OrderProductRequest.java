package com.ecommerce.e_commerce_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderProductRequest(
        @JsonProperty("product_id")
        @NotNull(message = "Ürün id gerekli.")
        Long productId,

        @NotNull(message = "Adet gerekli.")
        @Min(value = 1, message = "Adet en az 1 olmalıdır.")
        Integer count,

        @NotBlank(message = "Ürün detayı boş bırakılamaz.")
        String detail
) {}
