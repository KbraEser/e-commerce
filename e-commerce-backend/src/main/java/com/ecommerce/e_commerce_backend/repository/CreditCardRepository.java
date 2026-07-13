package com.ecommerce.e_commerce_backend.repository;



import com.ecommerce.e_commerce_backend.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
}
