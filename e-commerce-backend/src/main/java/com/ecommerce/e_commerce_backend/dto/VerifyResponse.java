package com.ecommerce.e_commerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyResponse {
    private String name;
    private String email;
    private String role_id;
    private String token;
}
