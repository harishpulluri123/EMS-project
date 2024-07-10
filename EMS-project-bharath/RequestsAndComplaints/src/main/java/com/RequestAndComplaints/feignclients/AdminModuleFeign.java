package com.RequestAndComplaints.feignclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.RequestAndComplaints.dto.CommonApiResponse;
import com.RequestAndComplaints.dto.RequestUserDto;



@FeignClient(name = "AdminModule-EKA", configuration = FeignConfig.class)
public interface AdminModuleFeign {

	
	 @PostMapping("/api/user/registeremp")
	    public ResponseEntity<CommonApiResponse> emregisterUser(@RequestBody RequestUserDto request); 
}
