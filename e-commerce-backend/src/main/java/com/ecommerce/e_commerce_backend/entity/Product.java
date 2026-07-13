package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "products", schema = "public")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "stock",nullable = false)
    private Integer stock;
    @Column(name = "store_id",nullable = false)
    private Long storeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;
    @Column(name = "rating",nullable = false)
    private Double rating;
    @Column(name = "sell_count",nullable = false)
    private Integer sellCount;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImage> images;



}
