package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.RoleDto;
import com.ecommerce.e_commerce_backend.entity.Role;
import com.ecommerce.e_commerce_backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll()
                .stream()
                .map(role -> new RoleDto(role.getId(), role.getName(), role.getCode()))
                .toList();
    }


    @Override
    public Role findById(Long id) {
        //todo exception
        return roleRepository.findById(id).orElse(null);
    }
}
