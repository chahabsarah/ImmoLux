package com.example.Immobilier.RC;

import com.example.Immobilier.dto.request.LikesUpdateRequest;
import com.example.Immobilier.entity.Image;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.service.ImageService;
import com.example.Immobilier.service.LocalService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/local")
public class LocalController {

    private final LocalService localService;
    private final ImageService imageService;

    public LocalController(LocalService localService, ImageService imageService) {
        this.localService = localService;
        this.imageService = imageService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Local>> getAllLocals() {
        List<Local> locals = localService.findAllLocals();
        return new ResponseEntity<>(locals, HttpStatus.OK);
    }
    @GetMapping("/{localId}/images")
    public ResponseEntity<List<String>> getImagesForLocal(@PathVariable Long localId) {
        List<String> imageUrls = localService.getImageUrlsForLocal(localId);
        return ResponseEntity.ok(imageUrls);
    }
    @GetMapping("/myLocal/{userId}")
    public ResponseEntity<List<Local>> getLocalsByUserId(@PathVariable Long userId) {
        List<Local> locals = localService.findLocalsByUserId(userId);
        return new ResponseEntity<>(locals, HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Local> getLocalById(@PathVariable("id") Long id) {
        Local local = localService.getLocalById(id);
        if (local == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(local);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLocal(@PathVariable("id") Long id) {
        boolean isDeleted = localService.deleteLocalById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

}
