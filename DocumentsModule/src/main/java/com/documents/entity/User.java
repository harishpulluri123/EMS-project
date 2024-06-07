package com.documents.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String firstname;
	private long empnumber;
	private String email;
	
	private String profilepic;
	
	  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	    private Documents documents;
}
