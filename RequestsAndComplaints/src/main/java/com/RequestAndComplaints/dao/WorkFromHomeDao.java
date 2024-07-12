package com.RequestAndComplaints.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RequestAndComplaints.entity.WorkFromHome;
import java.util.List;


@Repository
public interface WorkFromHomeDao extends JpaRepository<WorkFromHome, Integer>{
	
List<WorkFromHome> findByEmpnumberAndStatus(long empnumber, String status);

List<WorkFromHome> findByEmpnumber(long empnumber);

List<WorkFromHome> findByStatus(String status);
}
