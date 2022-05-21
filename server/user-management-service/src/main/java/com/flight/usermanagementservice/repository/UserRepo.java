package com.flight.usermanagementservice.repository;

import com.flight.usermanagementservice.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

}
