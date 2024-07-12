package com.RequestAndComplaints.feignclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.RequestAndComplaints.dto.CommonApiResponse;
import com.RequestAndComplaints.entity.Announcement;



@FeignClient(name = "AnnouncementsModule", configuration = FeignConfig.class)
public interface AnnouncementFeign {
	
	@PostMapping(value = "/announcments/addannouncement")
	public ResponseEntity<CommonApiResponse>addannouncement( @RequestBody Announcement announce);

}
