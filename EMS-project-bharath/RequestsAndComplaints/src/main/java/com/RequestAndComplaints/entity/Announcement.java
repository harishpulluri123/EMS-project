package com.RequestAndComplaints.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Announcement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private long empnumber;
	private String announcement;
	   @ManyToOne
	    @JoinColumn(name = "user_id")
	   @JsonIgnore
	    private User user;
}
