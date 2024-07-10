package com.announments.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.announments.dto.CommonApiResponse;
import com.announments.dto.ResponseDto;
import com.announments.entity.Announcement;
import com.announments.resource.AnnouncementResource;

@RestController
@RequestMapping("/announcments")
public class AnnouncementController {

	@Autowired
	AnnouncementResource resource;
	
	@PostMapping(value = "/addannouncement")
	public ResponseEntity<CommonApiResponse>addannouncement( @RequestBody Announcement announce){
		return resource.addannouncement(announce);
	}
	
	@GetMapping(value = "/findallannouncements")
	public ResponseEntity<ResponseDto>fetchallannouncements(){
		return resource.fetchallannouncements();
	}
}
