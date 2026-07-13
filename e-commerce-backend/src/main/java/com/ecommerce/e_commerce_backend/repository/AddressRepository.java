package com.ecommerce.e_commerce_backend.repository;

import com.ecommerce.e_commerce_backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
