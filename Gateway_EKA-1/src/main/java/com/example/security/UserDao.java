package com.example.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface UserDao extends JpaRepository<User, Integer>{
	User  findByEmailAndPassword(String email, String password);
	User findByEmail(String email);
	List<User> findByRole(String role);
	//List<User> findByDesignation(String designation);
	User findByEmpnumber(long empnumber);
	
	User findByEmailAndRole(String email, String role);
}
