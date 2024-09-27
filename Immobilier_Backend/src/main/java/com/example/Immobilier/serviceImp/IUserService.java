package com.example.Immobilier.serviceImp;



import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.User;
import com.example.Immobilier.entity.UserStatus;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getAllUsers();
    Optional<User> findById(Long id);
    void save(User user);
    void deleteUser(Long userId, String requestingUserEmail);


    User getUserByEmail(String email);

    boolean changePassword(String email, String oldPassword, String newPassword);

    User createUser(User user);

    User getUserById(Long id);

    List<User> getUserByStatus(UserStatus status);
    Local addLocal(User user, Local local);

    Local updateLocal(Long localId, Local localDetails);
    }
