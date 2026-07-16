package com.ecommerce.e_commerce_backend.utils;

import com.ecommerce.e_commerce_backend.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;



public class SecurityUtils {
    private SecurityUtils() {}

    public static User getCurrentUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(principal instanceof User user){
            return user;
        }
        //todo exception
        return null;
    }

}

