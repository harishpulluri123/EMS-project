package com.example.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Configuration
public class FeignClientConfiguration {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate requestTemplate) {
                // Add authorization header or any other headers required
                String token = "Bearer " + getJwtToken();
                requestTemplate.header("Authorization", token);
            }

            private String getJwtToken() {
                // Implement logic to retrieve the JWT token, e.g., from SecurityContextHolder or a token service
                return "your-jwt-token";
            }
        };
    }
}

