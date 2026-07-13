package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders",schema = "public")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @Column(name = "order_date",nullable = false)
    private String orderDate;

    @Column(name = "card_no", nullable = false)
    private String cardNo;

    @Column(name = "card_name", nullable = false)
    private String cardName;

    @Column(name = "card_expire_month", nullable = false)
    private Integer cardExpireMonth;

    @Column(name = "card_expire_year", nullable = false)
    private Integer cardExpireYear;

    @Column(name = "card_ccv", nullable = false)
    private Integer cardCcv;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();



//    card_expire_month: number
//    card_expire_year: number
//    card_ccv: number
//    price: number
//    products: OrderProductPayload[]

}
