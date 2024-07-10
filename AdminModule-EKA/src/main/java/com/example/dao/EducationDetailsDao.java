package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.EducationDetails;



@Repository
public interface EducationDetailsDao extends JpaRepository<EducationDetails, Integer>{

	
	EducationDetails  findByEmpnumber(Long empnumber);
}
