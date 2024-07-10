package com.example.security;



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
    private String middlename;
    private String lastname;
    private String gender; 
    private String dateofbirth; 
    
    private String email;
    private Long mobileno; 
    private String workertype; 
    private String timetype; 
    private String joiningdate; 
    private String jobtitle; 
    private String reportingmanager; 
    private String department; 
    private String location; 
    private String noticeperiod; 
    
    @JsonIgnore
    private String password;
    private String role;
    
    private long empnumber; // Standardized to "empnumber"
    
    private String status; // This field appears only in the first class
    
  
    
   
}