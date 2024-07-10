package com.example.attendance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.dto.ResponseDto;
import com.example.feignclient.AnnouncementFeign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@RestController
@RequestMapping("announceFeign")
public class AnnouncementController {
	
	@Autowired
	AnnouncementFeign feign;
	
    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	@GetMapping(value = "/getbirthdays")
	 public ResponseEntity<ResponseDto> findBirthdays() {
		return feign.findBirthdays();
	}
    
    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	@GetMapping(value = "/getnewjoiners")
	 public ResponseEntity<ResponseDto> findNewJoiners(){
		return feign.findNewJoiners();
	}
    
    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	@GetMapping(value = "/findallannouncements")
	public ResponseEntity<ResponseDto>fetchallannouncements(){
		return feign.fetchallannouncements();
	}
	 //circutebreaker for announcement
	 
	 public ResponseEntity<?>annfallback(java.lang.Throwable t){
		 return ResponseEntity.ok("Announcement module is Down...");
	 }
}
