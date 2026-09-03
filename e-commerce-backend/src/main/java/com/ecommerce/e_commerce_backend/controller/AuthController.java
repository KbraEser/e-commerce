package com.ecommerce.e_commerce_backend.controller;

import com.ecommerce.e_commerce_backend.dto.LoginRequest;
import com.ecommerce.e_commerce_backend.dto.LoginResponse;
import com.ecommerce.e_commerce_backend.dto.RegisterRequest;
import com.ecommerce.e_commerce_backend.dto.RegisterResponse;
import com.ecommerce.e_commerce_backend.dto.VerifyResponse;
import com.ecommerce.e_commerce_backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse signup(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @GetMapping("/verify")
    public VerifyResponse verify(HttpServletRequest request) {
        return authenticationService.verify(resolveToken(request));
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || header.isBlank()) {
            return null;
        }
        if (header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return header;
    }
}
