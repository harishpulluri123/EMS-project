package com.announments.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String firstname;
    private String middlename; // This field appears only in the first class
    private String lastname; // This field appears only in the first class
    private String gender; // This field appears only in the first class
    private String dateofbirth; // This is string in first class, you might want to standardize this to LocalDate
    
    private String email;
    private Long mobileno; // This field appears only in the first class
    private String workertype; // This field appears only in the first class
    private String timetype; // This field appears only in the first class
    private String joiningdate; // This is string in first class, you might want to standardize this to LocalDate
    private String jobtitle; // This field appears only in the first class
    private String reportingmanager; // This field appears only in the first class
    private String department; // This field appears only in the first class
    private String location; // This field appears only in the first class
    private String noticeperiod; // This field appears only in the first class
    
    @JsonIgnore
    private String password;
    private String role;
    private long empnumber; // Standardized to "empnumber"
    
    private String status; // This field appears only in the first class
    
    private LocalDate dateofjoining; // Adding LocalDate fields
    private LocalDate dob; // You may want to use this instead of string dateofbirth
    
   
}
