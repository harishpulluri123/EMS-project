package com.announments.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.announments.dto.CommonApiResponse;
import com.announments.dto.RequestUserDto;
import com.announments.entity.WorkFromHome;
import com.announments.feign.AdminModuleFeign;
import com.announments.feign.RequestAndComplaintsFeign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;



@RestController
@RequestMapping("/AdminnFeign")
public class FeignController {

	@Autowired
	 private AdminModuleFeign feign;
	
	@Autowired
	RequestAndComplaintsFeign rcfeign;
	
	 @CircuitBreaker(fallbackMethod = "adminfallback", name = "AdminModule-EKA") 
	 @PostMapping("/registeremp")
	    public ResponseEntity<CommonApiResponse> emregisterUser(@RequestBody RequestUserDto request){
		 return feign.emregisterUser(request);
	 }
	
	 @CircuitBreaker(fallbackMethod = "compleintsfallback", name = "RequestsAndComplaints") 
	 @PostMapping(value = "/workfromhomerequest")
		public ResponseEntity<CommonApiResponse>addrequest(@RequestBody WorkFromHome work){
		 return rcfeign.addrequest(work);
	 }
	 //requests and complaints
	 
	 public ResponseEntity<?>compleintsfallback(java.lang.Throwable t){
		 return ResponseEntity.ok("Requests and complaints module is Down...");
	 }
	 //circutebreker for admin module
	 public ResponseEntity<?>adminfallback(java.lang.Throwable t){
		 return ResponseEntity.ok("Admin module is Down...");
	 }
}
