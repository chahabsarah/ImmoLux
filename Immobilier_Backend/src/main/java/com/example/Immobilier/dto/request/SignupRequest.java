package com.example.Immobilier.dto.request;

import com.example.Immobilier.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    private String email;
    private String password;
    private String username;
    private String address;
    private String phoneNumber;
    private Role role;

}
