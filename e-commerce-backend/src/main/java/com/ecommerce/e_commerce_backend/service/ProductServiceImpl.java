package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.ProductDto;
import com.ecommerce.e_commerce_backend.dto.ProductImageDto;
import com.ecommerce.e_commerce_backend.dto.ProductsResponse;
import com.ecommerce.e_commerce_backend.entity.Product;
import com.ecommerce.e_commerce_backend.entity.ProductImage;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductsResponse getProducts(
            Integer category,
            String filter,
            String sort,
            Integer limit,
            Integer offset
    ) {
        Specification<Product> spec = buildSpecification(category, filter);
        Sort sortObj = buildSort(sort);

        int pageSize = (limit != null && limit > 0) ? limit : 8;
        int pageNumber = (offset != null && offset >= 0) ? offset / pageSize : 0;

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortObj);
        Page<Product> page = productRepository.findAll(spec, pageable);

        List<ProductDto> products = page.getContent().stream()
                .map(this::toDto)
                .toList();

        return new ProductsResponse(products, page.getTotalElements());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ApiException("Product not found: " + id, HttpStatus.NOT_FOUND));
        return toDto(product);
    }

    private Specification<Product> buildSpecification(Integer category, String filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null) {
                predicates.add(cb.equal(root.get("category").get("id"), category.longValue()));
            }

            if (filter != null && !filter.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(root.get("name")),
                        "%" + filter.toLowerCase() + "%"
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private Sort buildSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.unsorted();
        }

        String[] parts = sort.split(":");
        String field = parts[0];
        boolean desc = parts.length > 1 && "desc".equalsIgnoreCase(parts[1]);

        return desc ? Sort.by(field).descending() : Sort.by(field).ascending();
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
