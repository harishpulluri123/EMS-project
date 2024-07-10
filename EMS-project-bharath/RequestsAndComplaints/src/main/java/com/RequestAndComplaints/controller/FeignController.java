package com.RequestAndComplaints.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RequestAndComplaints.dto.CommonApiResponse;
import com.RequestAndComplaints.dto.RequestUserDto;
import com.RequestAndComplaints.entity.Announcement;
import com.RequestAndComplaints.feignclients.AdminModuleFeign;
import com.RequestAndComplaints.feignclients.AnnouncementFeign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@RestController
@RequestMapping("/AdminFeign")
public class FeignController {

	@Autowired
	AdminModuleFeign feign;
	
	@Autowired
	AnnouncementFeign annfeign;
	

	 @PostMapping("/registeremp")
	    public ResponseEntity<CommonApiResponse> emregisterUser(@RequestBody RequestUserDto request){
		 return feign.emregisterUser(request);
	 }
	 
	 
	 
	 @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	 @PostMapping(value = "/addannouncement")
		public ResponseEntity<CommonApiResponse>addannouncement( @RequestBody Announcement announce){
		 return annfeign.addannouncement(announce);
	 }
	 //circutebreaker for announcement
	 
	 public ResponseEntity<?>annfallback(java.lang.Throwable t){
		 return ResponseEntity.ok("Announcement module is Down...");
	 }
	 
}
