package com.example.attendance.model;


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
	private Long id;
	
	private String name;
	private String email;
	@JsonIgnore
	private String password;
	
	private String role;
	private String mobileno;
	//@Column(unique = true, nullable = false)
	 private String empNumber;
	
	 private String status;
	
	 private String position;
}
