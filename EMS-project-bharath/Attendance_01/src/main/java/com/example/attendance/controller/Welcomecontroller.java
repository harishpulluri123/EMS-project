package com.example.attendance.controller;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/attendencewelcome")
public class Welcomecontroller {
	@GetMapping("/attendancetest")
	public String getadmin(){
		return "attendance backend started";
	}
}
