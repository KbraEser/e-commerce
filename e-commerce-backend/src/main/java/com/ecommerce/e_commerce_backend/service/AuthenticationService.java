package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.RegisterRequest;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User register(RegisterRequest registerRequest) {
        if (!registerRequest.password().equals(registerRequest.passwordConfirm())) {
            throw new ApiException("Passwords do not match", HttpStatus.BAD_REQUEST);
        }
        userRepository.findByEmail(registerRequest.email()).ifPresent(user -> {
            throw new ApiException("Bu email ile kayıtlı kullanıcı zaten var", HttpStatus.CONFLICT);
        });

        User user = new User();
        user.setName(registerRequest.name());
        user.setEmail(registerRequest.email());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));

        return userRepository.save(user);
    }
}
