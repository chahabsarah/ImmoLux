package com.example.Immobilier.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long localID;

    private String localType;
    private float rent;
    private float sell;
    private Long bookingPrice;
    private  String localDescription;

    private String visitDate;

private String location;
    private String amenities;
    private String details;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "local")
    @JsonIgnore
    private Set<Image> images;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Builder.Default
    private Long likes = 0L;
    @JsonIgnore
    private List<String> imageUrls;
    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Like> userLikes;
}
