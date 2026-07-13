package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.RoleDto;
import com.ecommerce.e_commerce_backend.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<RoleDto> getAllRoles();
    Role findById(Long id);
}
