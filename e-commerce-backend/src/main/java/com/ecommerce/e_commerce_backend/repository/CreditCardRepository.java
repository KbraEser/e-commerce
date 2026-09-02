package com.ecommerce.e_commerce_backend.repository;



import com.ecommerce.e_commerce_backend.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    List<CreditCard> findAllByUserId(Long userId);

    Optional<CreditCard> findByIdAndUserId(Long id, Long userId);
}
