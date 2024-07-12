package com.example.demo.repo;


import com.example.demo.model.Payslip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Payslip, Long> {
	Payslip findByEmail(String email);
	
}
