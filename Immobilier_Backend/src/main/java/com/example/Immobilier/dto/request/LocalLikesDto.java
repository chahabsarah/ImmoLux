package com.example.Immobilier.dto.request;

public class LocalLikesDto {
    private Long localId;
    private Long likesCount;

    public LocalLikesDto(Long localId, Long likesCount) {
        this.localId = localId;
        this.likesCount = likesCount;
    }

    public Long getLocalId() {
        return localId;
    }

    public Long getLikesCount() {
        return likesCount;
    }
}
