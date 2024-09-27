package com.example.Immobilier.dto.response;


import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.Image;

import java.util.List;

public class LocalWithImagesResponse {
    private Local local;
    private List<Image> images;

    public LocalWithImagesResponse(Local local, List<Image> images) {
        this.local = local;
        this.images = images;
    }

    // Getters and Setters
    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
