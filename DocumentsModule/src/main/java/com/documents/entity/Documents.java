package com.documents.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data
@Entity
public class Documents {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long empnumber;
    private String documentType;
    private String documentPath;  // Add this field to store the path

    // Other fields for different document types
    private String aadhar;
    private String pancard;
    private String voterid;
    private String sscmemo;
    private String intermemo;
    private String degreememo;

    // Getters and setters for all fields
    @ManyToOne
    private User user; 

    
}