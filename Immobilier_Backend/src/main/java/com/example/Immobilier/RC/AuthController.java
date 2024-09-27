package com.example.Immobilier.RC;

import com.example.Immobilier.dto.request.LoginRequest;
import com.example.Immobilier.dto.request.SignupRequest;
import com.example.Immobilier.dto.response.JwtResponse;
import com.example.Immobilier.dto.response.MessageResponse;
import com.example.Immobilier.entity.ERole;
import com.example.Immobilier.entity.Role;
import com.example.Immobilier.entity.User;
import com.example.Immobilier.entity.UserStatus;
import com.example.Immobilier.repository.RoleRepository;
import com.example.Immobilier.repository.UserRepository;
import com.example.Immobilier.service.UserDetailsImpl;
import com.example.Immobilier.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders ="http://localhost:4200" ,methods={RequestMethod.POST,RequestMethod.PUT, RequestMethod.DELETE,RequestMethod.GET,RequestMethod.PATCH})
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAddress(),
                signUpRequest.getPhoneNumber()
        );

        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);

        if (signUpRequest.getEmail().contains("@esprit.tn")) {
            Role adminRole = roleRepository.findByName(ERole.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role ADMIN not found."));
            user.setRole(adminRole);
            user.setStatus(UserStatus.ACTIVE);
        } else if (signUpRequest.getEmail().contains("@gmail.com")) {
            Role userRole = roleRepository.findByName(ERole.ABONNE)
                    .orElseThrow(() -> new RuntimeException("Error: Role USER not found."));
            user.setRole(userRole);
            user.setStatus(UserStatus.PENDING);
        } else {

            user.setStatus(UserStatus.PENDING);        }

        userRepository.save(user);

        sendVerificationEmail(user.getEmail(), token);

        return ResponseEntity.ok(new MessageResponse("User registered successfully! Please verify your email."));
    }

    private void sendVerificationEmail(String email, String token) {
        String verificationUrl = token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Email Verification");
        message.setText("Please verify your email with this code: " + verificationUrl);

        mailSender.send(message);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
        try {
            User user = userRepository.findByVerificationToken(token)
                    .orElseThrow(() -> new RuntimeException("Error: Invalid verification token"));

            if (user.getStatus() == UserStatus.ACTIVE) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Account already active"));
            }

            user.setStatus(UserStatus.ACTIVE);
            user.setVerificationToken(null);
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("Account activated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error verifying the account"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getEmail()).orElse(null);

            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new MessageResponse("User not found"));
            }

            if (user.getStatus() == UserStatus.PENDING || user.getStatus() == UserStatus.REJECTED) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Account is not active. Please contact support."));
            }

            String jwt = jwtUtils.generateJwtToken(authentication);

            JwtResponse jwtResponse = new JwtResponse(
                    jwt,
                    "Bearer",
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getAddress(),
                    userDetails.getPhoneNumber(),
                    userDetails.getAuthorities().stream()
                            .map(item -> item.getAuthority())
                            .collect(Collectors.toList())
            );

            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Invalid email or password"));
        }
    }
    @PostMapping("/becomeAgence")
    public ResponseEntity<?> becomeAgence(@RequestParam("userId") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: User not found"));

        Role agenceRole = roleRepository.findByName(ERole.AGENCE)
                .orElseThrow(() -> new RuntimeException("Error: Role AGENCE not found"));

        user.setRole(agenceRole);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User role updated to AGENCE successfully!"));
    }

}
