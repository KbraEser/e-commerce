package com.ecommerce.e_commerce_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(
        @JsonProperty("address_id")
        @NotNull(message = "Adres seçilmelidir.")
        Long addressId,

        @JsonProperty("order_date")
        @NotBlank(message = "Sipariş tarihi boş bırakılamaz.")
        String orderDate,

        @JsonProperty("card_no")
        @NotNull(message = "Kart numarası boş bırakılamaz.")
        String cardNo,

        @JsonProperty("card_name")
        @NotBlank(message = "Kart üzerindeki isim boş bırakılamaz.")
        String cardName,

        @JsonProperty("card_expire_month")
        @NotNull(message = "Kart ayı boş bırakılamaz.")
        Integer cardExpireMonth,

        @JsonProperty("card_expire_year")
        @NotNull(message = "Kart yılı boş bırakılamaz.")
        Integer cardExpireYear,

        @JsonProperty("card_ccv")
        @NotNull(message = "CVV boş bırakılamaz.")
        Integer cardCcv,

        @NotNull(message = "Fiyat boş bırakılamaz.")
        BigDecimal price,

        @Valid
        @NotEmpty(message = "Siparişte en az bir ürün olmalıdır.")
        List<OrderProductRequest> products
) {}
