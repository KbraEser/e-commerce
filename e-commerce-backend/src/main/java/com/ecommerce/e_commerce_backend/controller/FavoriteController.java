package com.ecommerce.e_commerce_backend.controller;

import com.ecommerce.e_commerce_backend.dto.ProductDto;
import com.ecommerce.e_commerce_backend.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public List<ProductDto> getFavorites() {
        return favoriteService.getFavorites();
    }

    @PostMapping("/{productId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addFavorite(@PathVariable Long productId) {
        favoriteService.addFavorite(productId);
    }

    @DeleteMapping("/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeFavorite(@PathVariable Long productId) {
        favoriteService.removeFavorite(productId);
    }
}
