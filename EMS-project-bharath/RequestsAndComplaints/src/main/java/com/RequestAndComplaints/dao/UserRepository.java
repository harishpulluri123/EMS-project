package com.RequestAndComplaints.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RequestAndComplaints.entity.User;
import java.util.List;




@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByRole(String role);
  User findByEmpnumber(long empnumber);
}
