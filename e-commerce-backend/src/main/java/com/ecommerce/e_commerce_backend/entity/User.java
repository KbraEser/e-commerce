package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", schema = "public")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id",nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade=CascadeType.ALL, orphanRemoval = true )
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade=CascadeType.ALL, orphanRemoval = true )
    private List<CreditCard> creditCards = new ArrayList<>();


}
