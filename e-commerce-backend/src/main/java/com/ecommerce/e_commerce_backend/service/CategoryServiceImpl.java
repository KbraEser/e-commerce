package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.CategoryDto;
import com.ecommerce.e_commerce_backend.entity.Category;
import com.ecommerce.e_commerce_backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return  categoryRepository.findAll().stream().map(this::toDto).toList();
    }

    private CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getCode(),
                category.getTitle(),
                category.getImg(),
                category.getRating(),
                category.getGender()

        );
    }
}
