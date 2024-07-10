package com.example.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.dto.CommonApiResponse;
import com.example.dto.ResponseDto;
import com.example.entity.Announcement;


@FeignClient(name = "AnnouncementsModule", configuration = FeignConfig.class)
public interface AnnouncementFeign {
	
	@PostMapping(value = "/announcments/addannouncement")
	public ResponseEntity<CommonApiResponse>addannouncement( @RequestBody Announcement announce);

	
	
	@GetMapping(value = "/announcments/findallannouncements")
	public ResponseEntity<ResponseDto>fetchallannouncements();
	
	@GetMapping(value = "/user/getbirthdays")
	 public ResponseEntity<ResponseDto> findBirthdays();
	
	@GetMapping(value = "/user/getnewjoiners")
	 public ResponseEntity<ResponseDto> findNewJoiners();
}
