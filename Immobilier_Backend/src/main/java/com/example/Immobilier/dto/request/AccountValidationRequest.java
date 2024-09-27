package com.example.Immobilier.dto.request;

import com.example.Immobilier.entity.UserStatus;

public class AccountValidationRequest {
    private Long userId;
    private UserStatus status;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}
