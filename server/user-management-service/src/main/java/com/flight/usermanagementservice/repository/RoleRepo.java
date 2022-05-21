package com.flight.usermanagementservice.repository;

import com.flight.usermanagementservice.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, String> {

}
