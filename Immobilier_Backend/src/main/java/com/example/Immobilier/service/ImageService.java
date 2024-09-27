package com.example.Immobilier.service;
import com.example.Immobilier.entity.Image;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.repository.ImageRepository;
import com.example.Immobilier.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Value("${upload.local.images}")
    private String uploadDir;
    @Value("${export.local.images}")
    private String exportDir;
    private final ImageRepository imageRepository;
    private final LocalRepository localRepository;

    public ImageService(ImageRepository imageRepository, LocalRepository localRepository) {
        this.imageRepository = imageRepository;
        this.localRepository = localRepository;
    }

    public List<Image> addImagesToLocal(Long localId, List<MultipartFile> images) throws IOException {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new IllegalArgumentException("Local not found with ID: " + localId));

        List<Image> imageList = new ArrayList<>();

        for (MultipartFile imageFile : images) {
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath);

            Image image = Image.builder()
                    .fileName(fileName)
                    .path(filePath.toString())
                    .local(local)
                    .imageData(imageFile.getContentType())
                    .title(imageFile.getOriginalFilename())
                    .build();

            imageList.add(image);
        }

        return imageRepository.saveAll(imageList);
    }
}
