package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "categories",schema = "public")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="code",nullable = false,unique = true)
    private String code;
    @Column(name ="title",nullable = false)
    private String title;
    @Column(name ="img",nullable = false)
    private String img;
    @Column(name ="rating",nullable = false)
    private Double rating;
    @Column(name ="gender",nullable = false)
    private String gender;

    @OneToMany(mappedBy = "category")
    private List<Product> products = new ArrayList<>();


}
