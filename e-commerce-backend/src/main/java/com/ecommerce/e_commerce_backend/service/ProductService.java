package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.ProductDto;
import com.ecommerce.e_commerce_backend.dto.ProductsResponse;

public interface ProductService {
    ProductsResponse getProducts(
            Integer category,
            String filter,
            String sort,
            Integer limit,
            Integer offset
    );

    ProductDto getProductById(Long id);
}
