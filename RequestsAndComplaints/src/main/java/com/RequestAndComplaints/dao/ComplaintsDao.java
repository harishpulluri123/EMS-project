package com.RequestAndComplaints.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RequestAndComplaints.entity.Complaints;
import java.util.List;

@Repository
public interface ComplaintsDao extends JpaRepository<Complaints, Integer> {
	List<Complaints> findByEmpnumber(long empnumber);

}
