package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.OrderRequest;
import com.ecommerce.e_commerce_backend.dto.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    List<OrderResponse> getOrders();
}
