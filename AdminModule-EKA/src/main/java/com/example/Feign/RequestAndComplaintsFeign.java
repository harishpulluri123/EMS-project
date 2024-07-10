package com.example.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.dto.CommonApiResponse;
import com.example.entity.Complaints;




@FeignClient(name = "RequestsAndComplaints", configuration = FeignConfig.class)
public interface RequestAndComplaintsFeign {

	@PostMapping(value = "/complaints/addcomplaint")
	public ResponseEntity<CommonApiResponse>addcomplaint(@RequestBody Complaints com);
	
	@GetMapping(value = "/complaints/findbyempnumber")
	public ResponseEntity<CommonApiResponse>findcompliantsByempnumber(@RequestParam ("empnumber") long empnumber);
}
