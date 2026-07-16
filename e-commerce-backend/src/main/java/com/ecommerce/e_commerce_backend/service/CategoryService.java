package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.CategoryDto;
import com.ecommerce.e_commerce_backend.entity.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories() ;
}
