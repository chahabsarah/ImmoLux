package com.example.Immobilier.service;

import com.example.Immobilier.dto.request.LocalLikesDto;
import com.example.Immobilier.entity.Image;
import com.example.Immobilier.entity.Like;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.User;
import com.example.Immobilier.repository.LikeRepository;
import com.example.Immobilier.repository.LocalRepository;
import com.example.Immobilier.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LocalServiceImpl implements LocalService {

    @Autowired
    private Environment environment;
    private final LocalRepository localRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public LocalServiceImpl(LocalRepository localRepository,
                            UserRepository userRepository,
                            LikeRepository likeRepository) {
        this.localRepository = localRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
    }

    @Override
    public List<Local> findAllLocals() {
        return localRepository.findAll();
    }
    @Override
    public Local findLocalById(Long id) {
        return localRepository.findById(id).orElse(null);
    }

    @Override
    public List<Image> getImagesByLocalId(Long localId) {
        Local local = findLocalById(localId);
        return local != null ? new ArrayList<>(local.getImages()) : new ArrayList<>();
    }
    @Override
    public List<Local> findLocalsByUserId(Long userId) {
        return localRepository.findByUserId(userId);
    }
     @Override
    public List<String> getImageUrlsForLocal(Long localId) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new IllegalArgumentException("local not found with ID: " + localId));
        List<String> imageUrls = local.getImages().stream()
                .map(photo -> constructImageUrl(photo.getFileName()))
                .collect(Collectors.toList());

        return imageUrls;    }

    private String constructImageUrl(String fileName) {
            String baseUrl = environment.getProperty("export.local.images");
            if (baseUrl != null && !baseUrl.isEmpty() && fileName != null && !fileName.isEmpty()) {
                return baseUrl + fileName;
            } else {
                return null;
            }
        }
    public List<Long> getLikedLocals(Long userId) {
        return localRepository.findLikedLocalIdsByUserId(userId);
    }

    public Local getLocalById(Long id) {
        return localRepository.findById(id).orElse(null);
    }
    @Override
    public boolean deleteLocalById(Long id) {
        if (localRepository.existsById(id)) {
            localRepository.deleteById(id);
            return true;
        }
        return false;
    }

}


