package com.documents.service;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.documents.dao.UserDao;
import com.documents.entity.User;

@Service
public class UserService {

    private final Path profileImageStorageLocation = Paths.get("path/to/profile/images");

    @Autowired
    private UserDao userDao;

    public UserService() throws IOException {
        Files.createDirectories(this.profileImageStorageLocation);
    }

    public User saveUser(User user) {
        return userDao.save(user);
    }

    public Optional<User> findById(int id) {
        return userDao.findById(id);
    }

    public void uploadProfileImage(MultipartFile file, int userId) throws IOException {
        String fileName = file.getOriginalFilename();
        Path targetLocation = profileImageStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        Optional<User> optionalUser = findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
             saveUser(user);
        }
    }

    public User getbyemail(String email) {
		return userDao.findByEmail(email);
	} 
}
