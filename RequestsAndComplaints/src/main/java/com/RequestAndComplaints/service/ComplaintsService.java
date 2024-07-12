package com.RequestAndComplaints.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RequestAndComplaints.dao.ComplaintsDao;
import com.RequestAndComplaints.entity.Complaints;

@Service
public class ComplaintsService {

	@Autowired
	ComplaintsDao dao;
	
	public Complaints addcomplaints(Complaints com) {
		return dao.save(com);
	}
	
	public List<Complaints>findbyempnumber(long empnumber){
		return dao.findByEmpnumber(empnumber);
	}
	
	public List<Complaints>findallcomplaints(){
		return dao.findAll();
	}
}
