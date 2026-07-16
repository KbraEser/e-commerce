package com.ecommerce.e_commerce_backend.repository;

import com.ecommerce.e_commerce_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category, Long> {


}
