package com.announments.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.announments.dto.CommonApiResponse;
import com.announments.entity.WorkFromHome;


@FeignClient(name = "RequestsAndComplaints", configuration = FeignConfig.class)
public interface RequestAndComplaintsFeign {
	

	@PostMapping(value = "/workfromhome/request")
	public ResponseEntity<CommonApiResponse>addrequest(@RequestBody WorkFromHome work);

}
