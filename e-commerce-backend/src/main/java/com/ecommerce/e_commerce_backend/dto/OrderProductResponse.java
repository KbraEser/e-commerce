package com.ecommerce.e_commerce_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OrderProductResponse(
        @JsonProperty("product_id") Long productId,
        Integer count,
        String detail
) {}
