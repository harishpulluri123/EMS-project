package com.example.attendance.service;

import java.util.List;

import com.example.attendance.dto.UserDTO;
import com.example.attendance.model.User;

public interface UserService {
     UserDTO getUser(Long id);
    List<UserDTO> getAllUsers();
	UserDTO addUser(String name, String email);
	
	public User getbyemail(String email) ;
}

