package com.example.Immobilier.service;

import com.example.Immobilier.entity.ERole;
import com.example.Immobilier.entity.Local;
import com.example.Immobilier.entity.User;
import com.example.Immobilier.entity.UserStatus;
import com.example.Immobilier.repository.LocalRepository;
import com.example.Immobilier.repository.UserRepository;
import com.example.Immobilier.serviceImp.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private LocalRepository localRepository;

    @Override
    public Local addLocal(User user, Local local) {
        local.setUser(user);
        return localRepository.save(local);
    }

    @Override
    public Local updateLocal(Long localId, Local localDetails) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local not found"));

        local.setLocalType(localDetails.getLocalType());
        local.setRent(localDetails.getRent());
        local.setSell(localDetails.getSell());
        local.setBookingPrice(localDetails.getBookingPrice());
        local.setLocalDescription(localDetails.getLocalDescription());
        local.setVisitDate(localDetails.getVisitDate());
        local.setAmenities(localDetails.getAmenities());
        local.setDetails(localDetails.getDetails());

        return localRepository.save(local);
    }
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));
    }

    @Override
    public List<User> getUserByStatus(UserStatus status) {
        return userRepository.findByStatus(status);
    }
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }
    @Override
    @Transactional
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id, String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));
        User requester = getUserByEmail(email);
        ERole requesterRole = requester.getRole().getName();
        if (requesterRole.equals(ERole.ADMIN) || requester.getId().equals(id)) {
            userRepository.delete(user);
        } else {
            throw new RuntimeException("You do not have permission to delete this user.");
        }
    }

    @Override
    public boolean changePassword(String email, String oldPassword, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

}
