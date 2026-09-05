package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.LoginRequest;
import com.ecommerce.e_commerce_backend.dto.LoginResponse;
import com.ecommerce.e_commerce_backend.dto.RegisterRequest;
import com.ecommerce.e_commerce_backend.dto.RegisterResponse;
import com.ecommerce.e_commerce_backend.dto.VerifyResponse;
import com.ecommerce.e_commerce_backend.entity.Role;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.UserRepository;
import com.ecommerce.e_commerce_backend.utils.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoleService roleService,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public RegisterResponse register(RegisterRequest registerRequest) {
        if (!registerRequest.password().equals(registerRequest.passwordConfirm())) {
            throw new ApiException("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        userRepository.findByEmail(registerRequest.email()).ifPresent(user -> {
            throw new ApiException("Bu email ile kayıtlı kullanıcı zaten var", HttpStatus.CONFLICT);
        });

        Role role = roleService.findById(registerRequest.role_id());

        User user = new User();
        user.setName(registerRequest.name());
        user.setEmail(registerRequest.email());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        user.setRole(role);

        userRepository.save(user);

        return new RegisterResponse(user.getEmail(), "Kayıt başarılı bir şekilde gerçekleşti.");
    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new ApiException("Geçersiz email veya şifre", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException("Geçersiz email veya şifre", HttpStatus.UNAUTHORIZED));

        String token = jwtUtil.generateToken(user);

        return new LoginResponse(
                user.getId(),
                token,
                user.getName(),
                user.getEmail(),
                String.valueOf(user.getRole().getId())
        );
    }

    public VerifyResponse verify(String token) {
        if (token == null || token.isBlank()) {
            throw new ApiException("Token gerekli", HttpStatus.UNAUTHORIZED);
        }

        String email;
        try {
            email = jwtUtil.extractUsername(token);
        } catch (Exception e) {
            throw new ApiException("Geçersiz veya süresi dolmuş token", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Kullanıcı bulunamadı", HttpStatus.UNAUTHORIZED));

        if (!jwtUtil.validateToken(token, user)) {
            throw new ApiException("Geçersiz veya süresi dolmuş token", HttpStatus.UNAUTHORIZED);
        }

        return new VerifyResponse(
                user.getName(),
                user.getEmail(),
                String.valueOf(user.getRole().getId()),
                token
        );
    }
}
