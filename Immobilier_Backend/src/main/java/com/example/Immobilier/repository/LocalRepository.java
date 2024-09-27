package com.example.Immobilier.repository;

import com.example.Immobilier.dto.request.LocalLikesDto;
import com.example.Immobilier.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocalRepository extends JpaRepository<Local, Long> {
    List<Local> findByUserId(Long userId);

    @Query("SELECT l.localID FROM Local l WHERE EXISTS (SELECT 1 FROM l.userLikes ul WHERE ul.user.id = :userId)")
    List<Long> findLikedLocalIdsByUserId(@Param("userId") Long userId);



}
