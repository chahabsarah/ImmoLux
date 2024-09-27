package com.example.Immobilier.RC;

import com.example.Immobilier.dto.request.AccountValidationRequest;
import com.example.Immobilier.dto.request.ChangePasswordRequest;
import com.example.Immobilier.dto.request.LocalWithImagesRequest;
import com.example.Immobilier.dto.response.LocalWithImagesResponse;
import com.example.Immobilier.dto.response.MessageResponse;
import com.example.Immobilier.entity.*;
import com.example.Immobilier.service.*;
import com.example.Immobilier.serviceImp.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private IUserService iuserService;

    @Autowired
    private UserService userService;
    @Autowired
    private ImageService imageService;

    @Autowired
    private LikeService likeService;
    @Autowired
    private LocalService localService;
    @PostMapping("/addLike")
    public ResponseEntity<String> addLike(@RequestParam Long localId, @RequestParam Long userId) {
        try {
            likeService.addLike(localId, userId);
            return new ResponseEntity<>("Like added successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeLike")
    public ResponseEntity<String> removeLike(@RequestParam Long localId, @RequestParam Long userId) {
        try {
            likeService.removeLike(localId, userId);
            return new ResponseEntity<>("Like removed successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/users/{userId}/likes")
    public List<Long> getLikedLocals(@PathVariable Long userId, @RequestHeader("Authorization") String token) {
        return localService.getLikedLocals(userId);
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        boolean success = iuserService.changePassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());

        if(success) {
            return ResponseEntity.ok().body("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = iuserService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = iuserService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication) {
        String email = "";

        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            email = userDetails.getEmail();
        }

        try {
            iuserService.deleteUser(id, email);
            return ResponseEntity.ok().body(new MessageResponse("User deleted successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
        }
    }


    @GetMapping("/current")
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String email = userDetails.getEmail();
        return iuserService.getUserByEmail(email);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = iuserService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> validateAccounts(@RequestBody AccountValidationRequest request) {
        Optional<User> userOptional = iuserService.findById(request.getUserId());

        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Error: User not found.");
        }

        User user = userOptional.get();
        user.setStatus(request.getStatus());
        iuserService.save(user);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/add-local")
    @PreAuthorize("hasRole('AGENCE') or hasRole('ADMIN')")
    public ResponseEntity<?> addLocalWithImages(
            @ModelAttribute LocalWithImagesRequest request,
            Authentication authentication) {

        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = iuserService.getUserByEmail(userDetails.getEmail());

            if (!user.getRole().getName().equals(ERole.AGENCE) && !user.getRole().getName().equals(ERole.ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to add a local.");
            }

            Local newLocal = iuserService.addLocal(user, request.getLocal());
            List<Image> addedImages = imageService.addImagesToLocal(newLocal.getLocalID(), request.getImages());

            return ResponseEntity.ok(new LocalWithImagesResponse(newLocal, addedImages));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing images.");
        }
    }

    @PutMapping("/update/{localId}")
    public ResponseEntity<Local> updateLocal(@PathVariable Long localId, @RequestBody Local localDetails) {


        Local updatedLocal = iuserService.updateLocal(localId, localDetails);
        return ResponseEntity.ok(updatedLocal);
    }

}
