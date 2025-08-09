package com.groceryList.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groceryList.models.ERole;
import com.groceryList.models.Role;
import com.groceryList.models.User;
import com.groceryList.payload.request.LoginRequest;
import com.groceryList.payload.request.SignupRequest;
import com.groceryList.payload.response.JwtResponse;
import com.groceryList.payload.response.MessageResponse;
import com.groceryList.repository.RoleRepository;
import com.groceryList.repository.UserRepository;
import com.groceryList.security.jwt.JwtUtils;
import com.groceryList.security.services.UserDetailsImpl;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        // Ensure UserDetailsImpl exists and is imported correctly
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                ERole roleEnum;
                switch (role.toLowerCase()) {
                    case "admin":
                        roleEnum = ERole.ROLE_ADMIN;
                        break;
                    case "cashier":
                        roleEnum = ERole.ROLE_CASHIER;
                        break;
                    case "accountant":
                        roleEnum = ERole.ROLE_ACCOUNTANT;
                        break;
                    case "stock_manager":
                        roleEnum = ERole.ROLE_STOCK_MANAGER;
                        break;
                    default:
                        roleEnum = ERole.ROLE_USER;
                }
                Role roleToAdd = roleRepository.findByName(roleEnum)
                        .orElseThrow(() -> new RuntimeException("Error: Role '" + roleEnum.name() + "' is not found."));
                roles.add(roleToAdd);
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}