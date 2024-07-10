package com.documents.controller;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/documentwelcome")
public class Welcomecontroller {
	@GetMapping("/documenttest")
	public String getadmin(){
		return "document backend started";
	}
}
