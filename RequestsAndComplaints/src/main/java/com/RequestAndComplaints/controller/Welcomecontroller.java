package com.RequestAndComplaints.controller;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/requestwelcome")
public class Welcomecontroller {
	@GetMapping("/requesttest")
	public String getadmin(){
		return "resqustandcomplaints backend started";
	}
}
