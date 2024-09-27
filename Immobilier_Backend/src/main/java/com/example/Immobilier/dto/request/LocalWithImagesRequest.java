package com.example.Immobilier.dto.request;

import com.example.Immobilier.entity.Local;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocalWithImagesRequest {
    private Local local;
    private List<MultipartFile> images;
    private float rent;
    private float sell;
    private Long bookingPrice;
    private  String localDescription;
    private String location;

    private String visitDate;

    private String amenities;
    private String details;

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
}
