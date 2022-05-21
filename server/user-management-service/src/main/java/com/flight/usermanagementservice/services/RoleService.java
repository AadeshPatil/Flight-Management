package com.flight.usermanagementservice.services;

import com.flight.usermanagementservice.model.Role;
import com.flight.usermanagementservice.repository.RoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepo roleRepo;

    public Role setRoleDetails(Role role) {
        return roleRepo.save(role);
    }
}

