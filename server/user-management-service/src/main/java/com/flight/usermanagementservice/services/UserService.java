package com.flight.usermanagementservice.services;

import java.util.HashSet;
import java.util.Set;

import com.flight.usermanagementservice.model.Role;
import com.flight.usermanagementservice.model.User;
import com.flight.usermanagementservice.repository.RoleRepo;
import com.flight.usermanagementservice.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User setNewUser(User user) {
        return userRepo.save(user);
    }

    public User registerNewUser(User user) {

        Role role = roleRepo.findById("USER").get();
        System.out.println("Roles : " + role);

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return user;
    }

    public void initRolesAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin Role");
        roleRepo.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Passenger Role");
        roleRepo.save(userRole);

        Role airportAuthority = new Role();
        airportAuthority.setRoleName("AIRPORT AUTHORITY");
        airportAuthority.setRoleDescription("Airport Authority Role");
        roleRepo.save(airportAuthority);

        User user = new User();
        user.setUsername("Ria");
        user.setPassword(passwordEncoder.encode("ria@123"));
        user.setEmailId("ria123@gmail.com");
        user.setFirstName("Ria");
        user.setLastName("Singh");
        user.setMobile(1234569870);
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        user.setRoles(adminRoles);
        userRepo.save(user);

    }

}

