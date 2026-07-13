package com.ecommerce.e_commerce_backend.repository;

import com.ecommerce.e_commerce_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
