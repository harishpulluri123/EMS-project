package com.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.entity.User;
import com.example.service.UserService;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AdminModuleEkaApplication {


	public static void main(String[] args) {
		SpringApplication.run(AdminModuleEkaApplication.class, args);
	}
	@Bean
    public CommandLineRunner createAdminUser(UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@example.com";
            String adminPassword = "1233";
            String adminRole = "Admin";
 
            if (userService.findByEmailAndRole(adminEmail,adminRole) == null) {
                User adminUser = new User();
                adminUser.setEmail(adminEmail);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));
                adminUser.setRole(adminRole);
               // adminUser.setEmpnumber(1234);
                userService.savedata(adminUser);
                
            }
        };}
}
