package com.example.demo.control;

 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
@RestController
@RequestMapping("/paymentwelcome")
public class Welcomecontroller {
	@GetMapping("/paymenttest")
	public String getadmin(){
		return "payment backend started";
	}
}
