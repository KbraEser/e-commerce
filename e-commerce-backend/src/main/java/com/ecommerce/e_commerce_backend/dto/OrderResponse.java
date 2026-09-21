package com.ecommerce.e_commerce_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponse(
        Long id,
        @JsonProperty("address_id") Long addressId,
        @JsonProperty("order_date") String orderDate,
        @JsonProperty("card_no") String cardNo,
        @JsonProperty("card_name") String cardName,
        @JsonProperty("card_expire_month") Integer cardExpireMonth,
        @JsonProperty("card_expire_year") Integer cardExpireYear,
        BigDecimal price,
        List<OrderProductResponse> products
) {}
