package com.flight.usermanagementservice.controller;

import java.util.Optional;

import javax.annotation.PostConstruct;

import com.flight.usermanagementservice.model.User;
import com.flight.usermanagementservice.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initUserAndRoles() {
        userService.initRolesAndUser();
    }

    @PostMapping("/registerNewUser")
    public ResponseEntity<User> setUserDetails(@RequestBody User user) {
        try {
            return ResponseEntity.of(Optional.of(userService.registerNewUser(user)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> forAdmin() {
        try {
            return ResponseEntity.ok().body("Welcome To The Admin Of This Application!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this link!");
        }
    }

    @GetMapping("/forUser")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> forUser() {
        try {
            return ResponseEntity.ok().body("Welcome User!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this link!");
        }
    }
}
