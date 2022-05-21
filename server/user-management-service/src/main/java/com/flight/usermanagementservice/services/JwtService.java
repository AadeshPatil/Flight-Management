package com.flight.usermanagementservice.services;

import java.util.HashSet;
import java.util.Set;

import com.flight.usermanagementservice.model.JwtRequest;
import com.flight.usermanagementservice.model.JwtResponse;
import com.flight.usermanagementservice.model.User;
import com.flight.usermanagementservice.repository.UserRepo;
import com.flight.usermanagementservice.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String username = jwtRequest.getUsername();
        String password = jwtRequest.getPassword();

        authenticate(username, password);

        final UserDetails userDetails = loadUserByUsername(username);

        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        User user = userRepo.findById(username).get();

        return new JwtResponse(user, newGeneratedToken);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findById(username).get();

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    getAuthorities(user));
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private Set getAuthorities(User user) {
        Set authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });

        return authorities;
    }

    private void authenticate(String username, String password) throws Exception {
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User is disabled");
        } catch (BadCredentialsException e) {
            throw new Exception("Bad Credentials from Users!");
        }
    }

}
