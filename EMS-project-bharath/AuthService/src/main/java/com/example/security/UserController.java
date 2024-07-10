package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/auth")
public class UserController {

	

    @Autowired
    private UserResource resource;
	

	  //login api for all
		
		  @PostMapping("/login") public ResponseEntity<UserLoginResponse>
		  login(@RequestBody UserLoginRequest userLoginRequest) { return
		  resource.login(userLoginRequest); }
		 
	 
//login otp send api
  @PostMapping("/send-otp")
  public ResponseEntity<CommonApiResponse> sendOtp(@RequestBody OtpRequest otpRequest) {
      return resource.sendOtp(otpRequest);
  }
  
  @GetMapping("/test")
 public String testapi() {
	 return "Auth service Started";
 }
  
}
