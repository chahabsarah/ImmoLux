package com.example.Immobilier.entity;

import jakarta.persistence.*;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "likes", uniqueConstraints = @UniqueConstraint(columnNames = {"local_id", "user_id"}))
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
