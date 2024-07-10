package com.announments.controller;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/announcementwelcome")
public class Welcomecontroller {
	@GetMapping("/annoncementtest")
	public String getadmin(){
		return "annoncement backend started";
	}
}
