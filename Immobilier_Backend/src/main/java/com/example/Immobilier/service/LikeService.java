package com.example.Immobilier.service;

import com.example.Immobilier.entity.Like;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.User;
import com.example.Immobilier.repository.LikeRepository;
import com.example.Immobilier.repository.LocalRepository;
import com.example.Immobilier.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private UserRepository userRepository;

    public void addLike(Long localId, Long userId) {
        Local local = localRepository.findById(localId).orElseThrow(() -> new RuntimeException("Local not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (likeRepository.existsByLocalAndUser(local, user)) {
            throw new RuntimeException("User already liked this local");
        }

        Like like = Like.builder()
                .local(local)
                .user(user)
                .build();
        likeRepository.save(like);
        local.setLikes(local.getLikes() + 1);
        localRepository.save(local);
    }

    public void removeLike(Long localId, Long userId) {
        Local local = localRepository.findById(localId).orElseThrow(() -> new RuntimeException("Local not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Like like = likeRepository.findByLocalAndUser(local, user)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        likeRepository.delete(like);
        local.setLikes(local.getLikes() - 1);
        localRepository.save(local);
    }
}
