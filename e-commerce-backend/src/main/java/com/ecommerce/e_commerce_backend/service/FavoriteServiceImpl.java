package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.ProductDto;
import com.ecommerce.e_commerce_backend.dto.ProductImageDto;
import com.ecommerce.e_commerce_backend.entity.Favorite;
import com.ecommerce.e_commerce_backend.entity.Product;
import com.ecommerce.e_commerce_backend.entity.ProductImage;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.FavoriteRepository;
import com.ecommerce.e_commerce_backend.repository.ProductRepository;
import com.ecommerce.e_commerce_backend.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ProductRepository productRepository;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, ProductRepository productRepository) {
        this.favoriteRepository = favoriteRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getFavorites() {
        User user = SecurityUtils.getCurrentUser();
        return favoriteRepository.findAllByUserId(user.getId()).stream()
                .map(Favorite::getProduct)
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional
    public void addFavorite(Long productId) {
        User user = SecurityUtils.getCurrentUser();

        if (favoriteRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            return;
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException("Ürün bulunamadı: " + productId, HttpStatus.NOT_FOUND));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setProduct(product);
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void removeFavorite(Long productId) {
        User user = SecurityUtils.getCurrentUser();
        favoriteRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }

    private ProductDto toDto(Product product) {
        List<ProductImageDto> images = product.getImages() == null
                ? Collections.emptyList()
                : product.getImages().stream()
                .map(this::toImageDto)
                .toList();

        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getStoreId(),
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getRating(),
                product.getSellCount(),
                images
        );
    }

    private ProductImageDto toImageDto(ProductImage image) {
        return new ProductImageDto(image.getUrl(), image.getIndex());
    }
}
