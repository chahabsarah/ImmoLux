package com.example.Immobilier.dto.request;

import com.example.Immobilier.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RoleUpdateRequest {
    private String email;
    private String roleName;
    private Role role;
}
