package com.ecommerce.e_commerce_backend.seed;

import com.ecommerce.e_commerce_backend.dto.CategoryDto;
import com.ecommerce.e_commerce_backend.dto.ProductDto;
import com.ecommerce.e_commerce_backend.dto.ProductImageDto;
import com.ecommerce.e_commerce_backend.dto.ProductsResponse;
import com.ecommerce.e_commerce_backend.entity.Category;
import com.ecommerce.e_commerce_backend.entity.Product;
import com.ecommerce.e_commerce_backend.entity.ProductImage;
import com.ecommerce.e_commerce_backend.repository.CategoryRepository;
import com.ecommerce.e_commerce_backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Seeds categories and products from the Workintech reference API on first startup.
 * Skips seeding if categories already exist, so data is only fetched once.
 */
@Component
public class ProductDataSeeder implements CommandLineRunner {

    private static final String SOURCE_BASE_URL = "https://workintech-fe-ecommerce.onrender.com";
    private static final Logger log = LoggerFactory.getLogger(ProductDataSeeder.class);

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final RestClient restClient = RestClient.create();

    public ProductDataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            log.info("Categories already present, skipping seeding.");
            return;
        }

        try {
            Map<Long, Category> categoryBySourceId = seedCategories();
            seedProducts(categoryBySourceId);
        } catch (Exception e) {
            log.warn("Product/category seeding skipped, source API call failed: {}", e.getMessage());
        }
    }

    private Map<Long, Category> seedCategories() {
        CategoryDto[] sourceCategories = restClient.get()
                .uri(SOURCE_BASE_URL + "/categories")
                .retrieve()
                .body(CategoryDto[].class);

        Map<Long, Category> categoryBySourceId = new HashMap<>();
        if (sourceCategories == null) {
            return categoryBySourceId;
        }

        for (CategoryDto dto : sourceCategories) {
            Category category = new Category();
            category.setCode(dto.code());
            category.setTitle(dto.title());
            category.setImg(dto.img());
            category.setRating(dto.rating());
            category.setGender(dto.gender());
            category = categoryRepository.save(category);
            categoryBySourceId.put(dto.id(), category);
        }

        return categoryBySourceId;
    }

    private void seedProducts(Map<Long, Category> categoryBySourceId) {
        ProductsResponse response = restClient.get()
                .uri(SOURCE_BASE_URL + "/products?limit=1000&offset=0")
                .retrieve()
                .body(ProductsResponse.class);

        if (response == null || response.products() == null) {
            return;
        }

        int savedCount = 0;
        for (ProductDto dto : response.products()) {
            Category category = categoryBySourceId.get(dto.categoryId());
            if (category == null) {
                continue;
            }

            Product product = new Product();
            product.setName(dto.name());
            product.setDescription(dto.description());
            product.setPrice(dto.price());
            product.setStock(dto.stock());
            product.setStoreId(dto.storeId());
            product.setCategory(category);
            product.setRating(dto.rating());
            product.setSellCount(dto.sellCount());
            product.setImages(new ArrayList<>());
            product = productRepository.save(product);

            List<ProductImage> images = new ArrayList<>();
            List<ProductImageDto> sourceImages = dto.images();
            if (sourceImages != null) {
                for (ProductImageDto imageDto : sourceImages) {
                    ProductImage image = new ProductImage();
                    image.setUrl(imageDto.url());
                    image.setIndex(imageDto.index());
                    image.setProduct(product);
                    images.add(image);
                }
            }
            product.setImages(images);
            productRepository.save(product);
            savedCount++;
        }

        log.info("Seeded {} products.", savedCount);
    }
}
