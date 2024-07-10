package com.example.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "DocumentsModule", configuration = FeignConfig.class)
public interface DocumentFeign {
	
	 @GetMapping("/documents/download")
	    public ResponseEntity<byte[]> downloadDocument(
	            @RequestParam("empnumber") Long empnumber,
	            @RequestParam("documentType") String documentType);

}
