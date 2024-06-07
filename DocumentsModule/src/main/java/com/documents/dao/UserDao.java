package com.documents.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.documents.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

	User findByEmpnumber(long empnumber);
}
