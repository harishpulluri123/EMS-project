package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
    private Long id;
	@NotNull
    private String name;
    
    private String profileImagePath;
    @NotNull
    private String aadharFilePath;
    
    private String voterIdFilePath;
    @NotNull
    private String pancardFilePath;
    @NotNull
    private String sscFilePath;
    @NotNull
    private String intermediateFilePath;
    @NotNull
    private String graduationFilePath;
    
    private String postGraduationFilePath;
    private String drivingLicenceFilePath;
    private String passportFilePath;
}