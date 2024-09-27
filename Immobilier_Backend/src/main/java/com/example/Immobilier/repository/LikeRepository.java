package com.example.Immobilier.repository;

import com.example.Immobilier.entity.Like;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByLocalAndUser(Local local, User user);
    Optional<Like> findByLocalAndUser(Local local, User user);

    List<Like> findByUserId(Long userId);
}
