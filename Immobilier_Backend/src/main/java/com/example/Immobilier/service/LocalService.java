package com.example.Immobilier.service;

import com.example.Immobilier.entity.Image;
import com.example.Immobilier.entity.Local;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface LocalService {
    List<Local> findAllLocals();

    Local findLocalById(Long id);

    List<Image> getImagesByLocalId(Long localId);

    List<String> getImageUrlsForLocal(Long localId);

    public List<Local> findLocalsByUserId(Long userId);

    public List<Long> getLikedLocals(Long userId);
    public Local getLocalById(Long id) ;
    public boolean deleteLocalById(Long id) ;
}
