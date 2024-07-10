package com.announments.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.announments.dto.CommonApiResponse;
import com.announments.dto.RequestUserDto;



@FeignClient(name = "AdminModule-EKA", configuration = FeignConfig.class)
public interface AdminModuleFeign {

	
	 @PostMapping("/api/user/registeremp")
	    public ResponseEntity<CommonApiResponse> emregisterUser(@RequestBody RequestUserDto request); 
}
