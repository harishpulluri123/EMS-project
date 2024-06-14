package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;



@Repository
public interface UserDao extends JpaRepository<User, Long>{
	User  findByEmailAndPassword(String email, String password);
	User findByEmail(String email);
 	List<User> findByRole(String role);

	//List<User> findByDesignation(String designation);
	User  findByEmpNumber(Long empNumber);
	
	User findByEmailAndRole(String email, String role);
	Optional<User> findById(Long userId);
	User findByEmpNumber(long empNumber);
	   @Query("SELECT u FROM User u WHERE u.dob BETWEEN :startDate AND :endDate")
 	List<User> findUsersWithBirthdaysBetween(LocalDate startDate, LocalDate endDate);
		 @Query("SELECT u FROM User u WHERE u.dateofjoining BETWEEN :startDate AND :endDate")
	List<User> findUsersWithJoiningDatesBetween(LocalDate startDate, LocalDate endDate);
 }
