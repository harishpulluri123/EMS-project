package com.example.dto;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;

import com.example.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class RequestUserDto {
	private String firstname;
	private String middlename;
	private String lastname;
	private String gender;
	 private LocalDate dob;
	
	private String email;
	private Long mobileno;
	private String workertype;
	private String timetype;
	private LocalDate dateofjoining;
	private String jobtitle;
	private String reportingmanager;
	private String department;
	private String location;
	private String noticeperiod;
	 private LocalDate date;
	  private Double BasicSalary;
	
	
	private String password;

	 private Long empNumber;
	 
	
	
	public static User toUserEntity(RequestUserDto registerUserRequestDto) {
		User user = new User();
		BeanUtils.copyProperties(registerUserRequestDto, user);
		return user;
	}
}
