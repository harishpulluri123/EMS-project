 
	// dto/UserDTO.java
	package com.example.dto;

	import com.example.entity.User;

import lombok.Data;

	 @Data
	public class UserDTO {
	    private Long id;
	    private String name;
	    private String email;
	    private String role;
	    private Long mobileno;
	    private long empNumber;
	    private String status;
	    private String position;

	    public UserDTO() {}

	    public UserDTO(User user) {
	        this.id = (long) user.getId();
	        this.name = user.getFirstname();
	        this.email = user.getEmail();
	        this.role = user.getRole();
	        this.mobileno = user.getMobileno();
	        this.empNumber = user.getEmpnumber();
	        this.status = user.getStatus();
	        
	    }
	}


	

