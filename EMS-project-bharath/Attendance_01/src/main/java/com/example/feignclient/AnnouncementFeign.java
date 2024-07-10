package com.example.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.attendance.dto.ResponseDto;

@FeignClient("AnnouncementsModule")
public interface AnnouncementFeign {
	
	@GetMapping(value = "/user/getbirthdays")
	 public ResponseEntity<ResponseDto> findBirthdays() ;
	
	@GetMapping(value = "/user/getnewjoiners")
	 public ResponseEntity<ResponseDto> findNewJoiners();
	
	@GetMapping(value = "/announcments/findallannouncements")
	public ResponseEntity<ResponseDto>fetchallannouncements();

}
