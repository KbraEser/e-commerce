package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "product_images",schema = "public")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url",nullable = false)
    private String url;

    @Column(name = "image_index",nullable = false)
    private Integer index;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


}
