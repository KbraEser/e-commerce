package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.OrderProductRequest;
import com.ecommerce.e_commerce_backend.dto.OrderProductResponse;
import com.ecommerce.e_commerce_backend.dto.OrderRequest;
import com.ecommerce.e_commerce_backend.dto.OrderResponse;
import com.ecommerce.e_commerce_backend.entity.Address;
import com.ecommerce.e_commerce_backend.entity.Order;
import com.ecommerce.e_commerce_backend.entity.OrderItem;
import com.ecommerce.e_commerce_backend.entity.Product;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.AddressRepository;
import com.ecommerce.e_commerce_backend.repository.OrderRepository;
import com.ecommerce.e_commerce_backend.repository.ProductRepository;
import com.ecommerce.e_commerce_backend.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            AddressRepository addressRepository,
            ProductRepository productRepository
    ) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = SecurityUtils.getCurrentUser();

        Address address = addressRepository.findByIdAndUserId(request.addressId(), user.getId())
                .orElseThrow(() -> new ApiException("Adres bulunamadı.", HttpStatus.NOT_FOUND));

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setOrderDate(request.orderDate());
        String cardNo =String.valueOf(request.cardNo());
        String lastFour = cardNo.substring(Math.max(0, cardNo.length()-4));
        order.setCardNo(lastFour);
        order.setCardName(request.cardName());
        order.setCardExpireMonth(request.cardExpireMonth());
        order.setCardExpireYear(request.cardExpireYear());

        order.setPrice(request.price());

        List<OrderItem> items = new ArrayList<>();
        for (OrderProductRequest productRequest : request.products()) {
            Product product = productRepository.findById(productRequest.productId())
                    .orElseThrow(() -> new ApiException(
                            "Ürün bulunamadı: " + productRequest.productId(),
                            HttpStatus.NOT_FOUND
                    ));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setCount(productRequest.count());
            item.setDetail(productRequest.detail());
            items.add(item);
        }

        order.setItems(items);
        Order saved = orderRepository.save(order);
        return toDto(saved);
    }

    @Override
    @Transactional
    public List<OrderResponse> getOrders() {
        User user = SecurityUtils.getCurrentUser();
        return orderRepository.findAllByUserIdOrderByIdDesc(user.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    private OrderResponse toDto(Order order) {
        List<OrderProductResponse> products = order.getItems().stream()
                .map(item -> new OrderProductResponse(
                        item.getProduct().getId(),
                        item.getCount(),
                        item.getDetail()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getAddress().getId(),
                order.getOrderDate(),
                order.getCardNo(),
                order.getCardName(),
                order.getCardExpireMonth(),
                order.getCardExpireYear(),
                order.getPrice(),
                products
        );
    }
}
