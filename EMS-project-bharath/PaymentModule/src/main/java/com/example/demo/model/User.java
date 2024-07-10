package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;
    private Double amount;
    private long empnumber;
    private String email;
	private String password;
	private String role;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Payslip employee;

    // Getters and Setters
    // ...
}
