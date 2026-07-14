package com.ecommerce.e_commerce_backend.repository;

import com.ecommerce.e_commerce_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
