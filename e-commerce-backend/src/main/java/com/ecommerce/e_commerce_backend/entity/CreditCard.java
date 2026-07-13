package com.ecommerce.e_commerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="credit_cards",schema = "public")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_no", nullable = false)
    private String cardNumber;

    @Column(name = "expire_month", nullable = false)
    private Integer expireMonth;

    @Column(name = "expire_year", nullable = false)
    private Integer expireYear;

    @Column(name = "name_on_card", nullable = false)
    private String nameOnCard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

}
