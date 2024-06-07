package com.documents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.documents.dao.UserDao;
import com.documents.entity.User;

@Service
public class UserService {
	
	@Autowired
	UserDao dao;
	
	
	public User updateuser(User user) {
		return dao.save(user);
	}

	public User findByEmpnumber(long empnumber) {
		return dao.findByEmpnumber(empnumber);
	}
}
