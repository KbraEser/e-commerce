package com.ecommerce.e_commerce_backend.service;


import com.ecommerce.e_commerce_backend.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findById(long id);
}
