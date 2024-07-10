package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Feign.AnnouncementFeign;
import com.example.Feign.AttedanceFeign;
import com.example.Feign.DocumentFeign;
import com.example.Feign.RequestAndComplaintsFeign;
import com.example.dto.AttendanceDTO;
import com.example.dto.CommonApiResponse;
import com.example.dto.ResponseDto;
import com.example.entity.Announcement;
import com.example.entity.Complaints;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@RestController
@RequestMapping("RequestFeign")
public class FeignController {
	
	@Autowired
	RequestAndComplaintsFeign feign;
	
	@Autowired
	AnnouncementFeign annfeign;
	
	@Autowired
	DocumentFeign docfeign;
	
	@Autowired
	AttedanceFeign attfeign;
	
    @CircuitBreaker(fallbackMethod = "compleintsfallback", name = "RequestsAndComplaints")
	@PostMapping(value = "/addcomplaint")
	public ResponseEntity<CommonApiResponse>addcomplaint(@RequestBody Complaints com){
		return feign.addcomplaint(com);
	}
	
    @CircuitBreaker(fallbackMethod = "compleintsfallback", name = "RequestsAndComplaints")
	@GetMapping(value = "/findbyempnumber")
	public ResponseEntity<CommonApiResponse>findcompliantsByempnumber(@RequestParam ("empnumber") long empnumber){
		return feign.findcompliantsByempnumber(empnumber);
	}


	
	//announcement module
    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	@PostMapping(value = "/addannouncement")
	public ResponseEntity<CommonApiResponse>addannouncement( @RequestBody Announcement announce){
		return annfeign.addannouncement(announce);
	}
    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	@GetMapping(value = "/findallannouncements")
	public ResponseEntity<ResponseDto>fetchallannouncements(){
		return annfeign.fetchallannouncements();
	}
	
	//
    @CircuitBreaker(fallbackMethod = "documentsfallback", name = "DocumentsModule")
	 @GetMapping("/documentsdownload")
	    public ResponseEntity<byte[]> downloadDocument(
	            @RequestParam("empnumber") Long empnumber,
	            @RequestParam("documentType") String documentType){
	    	return docfeign.downloadDocument(empnumber, documentType);
	    }
	
	    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
	    @GetMapping(value = "/getbirthdays")
		 public ResponseEntity<ResponseDto> findBirthdays(){
	    	return annfeign.findBirthdays();
	    }
	    @CircuitBreaker(fallbackMethod = "annfallback", name = "AnnouncementsModule")
		@GetMapping(value = "/getnewjoiners")
		 public ResponseEntity<ResponseDto> findNewJoiners(){
			return annfeign.findNewJoiners();
		}
	    
		
		 @CircuitBreaker(fallbackMethod = "fallback", name = "Attendance1")
		 @PostMapping("/login")
		    public AttendanceDTO login(@RequestParam Long userId) {
			 return attfeign.login(userId);
			 
		 }
		 
		 @CircuitBreaker(fallbackMethod = "fallback", name = "Attendance1")
		 @PostMapping("/attendance/logout")
		    public AttendanceDTO logout(@RequestParam Long userId) {
			 return attfeign.logout(userId);
		 }
	    
		 public ResponseEntity<?> fallback(java.lang.Throwable t){
			 return ResponseEntity.ok("Attendence module is Down...");
		 }
		 
		 //circutebreaker for announcement
		 
		 public ResponseEntity<?>annfallback(java.lang.Throwable t){
			 return ResponseEntity.ok("Announcement module is Down...");
		 }
		 
		 //circutebreaker for complaints
		 
		 public ResponseEntity<?>compleintsfallback(java.lang.Throwable t){
			 return ResponseEntity.ok("Requests and complaints module is Down...");
		 }
	    //circutebreaker for documents
		 public ResponseEntity<?>documentsfallback(java.lang.Throwable t){
			 return ResponseEntity.ok("Requests and complaints module is Down...");
		 }
}
