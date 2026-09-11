package com.ecommerce.e_commerce_backend.seed;

import com.ecommerce.e_commerce_backend.entity.Role;
import com.ecommerce.e_commerce_backend.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Ensures the core account-type roles exist. Inserts only the roles that are
 * missing (by code), so it is safe to run against a database that already
 * has some roles seeded manually.
 */
@Component
@Order(0)
public class RoleSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(RoleSeeder.class);

    private record RequiredRole(String name, String code) {}

    private static final List<RequiredRole> REQUIRED_ROLES = List.of(
            new RequiredRole("Admin", "ADMIN"),
            new RequiredRole("Müşteri", "CUSTOMER"),
            new RequiredRole("Mağaza", "STORE")
    );

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        for (RequiredRole required : REQUIRED_ROLES) {
            if (!roleRepository.existsByCode(required.code())) {
                Role role = new Role();
                role.setName(required.name());
                role.setCode(required.code());
                roleRepository.save(role);
                log.info("Seeded missing role: {}", required.code());
            }
        }
    }
}
