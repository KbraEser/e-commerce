package com.ecommerce.e_commerce_backend.controller;

import com.ecommerce.e_commerce_backend.dto.RoleDto;
import com.ecommerce.e_commerce_backend.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")

public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<RoleDto> getAllRoles() {
        return  roleService.getAllRoles();
    }
}
