package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(
        @ModelAttribute User user,
        @RequestParam("image") MultipartFile image,
        @RequestParam("aadharFile") MultipartFile aadharFile,
        @RequestParam("voterIdFile") MultipartFile voterIdFile,
        @RequestParam("pancardFile") MultipartFile pancardFile,
        @RequestParam("sscFile") MultipartFile sscFile,
        @RequestParam("intermediateFile") MultipartFile intermediateFile,
        @RequestParam("graduationFile") MultipartFile graduationFile,
        @RequestParam("postGraduationFile") MultipartFile postGraduationFile,
        @RequestParam("drivingLicenceFile") MultipartFile drivingLicenceFile,
        @RequestParam("passportFile") MultipartFile passportFile) {
        try {
            User savedUser = userService.saveUser(user, image, aadharFile, voterIdFile, pancardFile, sscFile, intermediateFile, graduationFile, postGraduationFile, drivingLicenceFile, passportFile);
            return ResponseEntity.ok(savedUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save user!");
        }
    }

    @PutMapping("/update/image")
    public ResponseEntity<User> updateImage(@RequestParam("id") Long id, @RequestParam("image") MultipartFile image) {
        return userService.updateUserImage(id, image)
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/document")
    public ResponseEntity<User> updateDocument1(
        @RequestParam("id") Long id,
        @RequestParam(value = "aadharFile", required = false) MultipartFile aadharFile,
        @RequestParam(value = "voterIdFile", required = false) MultipartFile voterIdFile,
        @RequestParam(value = "pancardFile", required = false) MultipartFile pancardFile,
        @RequestParam(value = "sscFile", required = false) MultipartFile sscFile,
        @RequestParam(value = "intermediateFile", required = false) MultipartFile intermediateFile,
        @RequestParam(value = "graduationFile", required = false) MultipartFile graduationFile,
        @RequestParam(value = "postGraduationFile", required = false) MultipartFile postGraduationFile,
        @RequestParam(value = "drivingLicenceFile", required = false) MultipartFile drivingLicenceFile,
        @RequestParam(value = "passportFile", required = false) MultipartFile passportFile) {
        return userService.updateUserDocument(id, aadharFile, voterIdFile, pancardFile, sscFile, intermediateFile, graduationFile, postGraduationFile, drivingLicenceFile, passportFile)
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/image")
    public ResponseEntity<Void> deleteImage(@RequestParam("id") Long id) {
        return userService.deleteUserImage(id)
            .map(v -> new ResponseEntity<Void>(HttpStatus.NO_CONTENT))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/document")
    public ResponseEntity<Void> deleteDocument(@RequestParam("id") Long id, @RequestParam("type") String type) {
        return userService.deleteUserDocument(id, type)
            .map(v -> new ResponseEntity<Void>(HttpStatus.NO_CONTENT))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return Optional.ofNullable(userService.getUserById(id))
            .map(user -> ResponseEntity.ok().body(user))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/alluser")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @GetMapping("/getimage/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable Long id) throws IOException {
        User user = userService.getUserById(id);
        if (user == null || user.getProfileImagePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Path path = Paths.get(uploadDir, user.getProfileImagePath());
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path.toFile());
        String probeContentType = Files.probeContentType(path);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(probeContentType))
            .body(resource);
    }
}
