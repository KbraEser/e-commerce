package com.ecommerce.e_commerce_backend.repository;

import com.ecommerce.e_commerce_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserIdOrderByIdDesc(Long userId);
}
