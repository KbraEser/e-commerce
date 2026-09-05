package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.ProductDto;

import java.util.List;

public interface FavoriteService {
    List<ProductDto> getFavorites();

    void addFavorite(Long productId);

    void removeFavorite(Long productId);
}
