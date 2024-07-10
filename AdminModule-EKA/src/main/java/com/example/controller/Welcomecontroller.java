package com.example.controller;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/adminwelcome")
public class Welcomecontroller {
	@GetMapping("/admintest")
	public String getadmin(){
		return "admin backend started";
	}
}
