package com.example.Immobilier.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";  // Constant value lel token

    private Long id;
    private String username;
    private String email;
    private String address;
    private String phoneNumber;
    private List<String> roles;


}
