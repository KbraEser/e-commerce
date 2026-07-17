package com.ecommerce.e_commerce_backend.dto;

import java.util.List;

public record ProductsResponse(
        List<ProductDto> products,
        long total
) {}
