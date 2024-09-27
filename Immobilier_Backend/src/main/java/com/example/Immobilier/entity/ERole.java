package com.example.Immobilier.entity;

public enum ERole {
    ADMIN,
    ABONNE,
    AGENCE;

    public static boolean equalsIgnoreCase(ERole role, String input) {
        return role.name().equalsIgnoreCase(input);
    }
}
