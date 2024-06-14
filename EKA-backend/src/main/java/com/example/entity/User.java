package com.example.entity;



import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
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
	private LocalDate dob;

	@JsonIgnore
	private String password;
	private String role;
	 private Long empNumber;
	 
	 private String status;
	 
	 //private String Designation;
	 
	 @OneToOne
	    @JoinColumn(name = "education_id") // optional, specifies the foreign key column
	    private EducationDetails education;
	 
	 @OneToOne
	 @JoinColumn(name="bank_id")
	 private BankDetails bank;
	 
	 private LocalDate date;
	    private Double amount;

	    @ManyToOne
	    @JoinColumn(name = "employee_id")
	    private Payslip employee;
	    
		private LocalDate dateofjoining;

}
