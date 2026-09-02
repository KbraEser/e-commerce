package com.ecommerce.e_commerce_backend.utils;

import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    private SecurityUtils() {}

    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof User user)) {
            throw new ApiException("Oturum bulunamadı", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
