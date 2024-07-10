 
	// dto/UserDTO.java
	package com.example.attendance.dto;

	import com.example.attendance.model.User;

import lombok.Data;

	 @Data
	public class UserDTO {
	    private Long id;
	    private String name;
	    private String email;
	    private String role;
	    private String mobileno;
	    private String empNumber;
	    private String status;
	    private String position;

	    public UserDTO() {}

	    public UserDTO(User user) {
	        this.id = user.getId();
	        this.name = user.getName();
	        this.email = user.getEmail();
	        this.role = user.getRole();
	        this.mobileno = user.getMobileno();
	        this.empNumber = user.getEmpNumber();
	        this.status = user.getStatus();
	        this.position = user.getPosition();
	    }
	}


	

