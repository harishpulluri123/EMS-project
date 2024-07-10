package com.announments.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.announments.dto.CommonApiResponse;
import com.announments.dto.ResponseDto;
import com.announments.entity.Announcement;
import com.announments.entity.User;
import com.announments.exceptions.AnnouncementAddFailedException;
import com.announments.exceptions.DataNotFound;
import com.announments.exceptions.UserNotFoundException;
import com.announments.service.AnnouncementService;
import com.announments.service.UserService;

@Service
public class AnnouncementResource {

	@Autowired
	AnnouncementService service;
	
	@Autowired
	UserService userservice;
	
	public ResponseEntity<CommonApiResponse>addannouncement(Announcement announce){
		
		CommonApiResponse response = new CommonApiResponse();
		
		User user = userservice.findbyempnumber(announce.getEmpnumber());
		
		if(user==null) {
			throw new UserNotFoundException("your not authorised person");
		}
		announce.setUser(user);
		Announcement addannouncemnt = service.addannouncemnt(announce);
		if(addannouncemnt==null) {
			throw new AnnouncementAddFailedException("Faild to send announcement");
		}
		response.setMessage("successfully added announcement");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
		
	}
	
	public ResponseEntity<ResponseDto>fetchallannouncements(){
		
		ResponseDto dto = new ResponseDto();
		
		List<Announcement> findall = service.findall();
		if(findall.isEmpty()) {
			/*
			 * dto.setMessage("no data found"); dto.setStatus(false); return new
			 * ResponseEntity<ResponseDto>(dto,HttpStatus.INTERNAL_SERVER_ERROR);
			 */
			throw new DataNotFound("No new announcement data found");
		}
		dto.setListannounce(findall);
		dto.setMessage(" data found");
		dto.setStatus(true);
		return new ResponseEntity<ResponseDto>(dto,HttpStatus.OK);
	}
}
