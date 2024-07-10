package com.announments.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.announments.dto.ResponseDto;
import com.announments.resource.UserResource;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserResource resource;
	
	 @GetMapping(value = "/getbirthdays")
	 public ResponseEntity<ResponseDto> findBirthdays() {
		 return resource.findBirthdays();
	 }
	 
	 @GetMapping(value = "/getnewjoiners")
	 public ResponseEntity<ResponseDto> findNewJoiners() {
		 return resource.findNewJoiners();
	 }
}
