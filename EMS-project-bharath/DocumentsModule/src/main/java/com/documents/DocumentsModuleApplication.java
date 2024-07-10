package com.documents;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient

public class DocumentsModuleApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocumentsModuleApplication.class, args);
	}

}
