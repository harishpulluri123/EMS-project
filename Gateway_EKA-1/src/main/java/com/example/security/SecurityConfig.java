package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter authFilter;

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable())
            .authorizeHttpRequests(auth -> auth
            		
            		//this apis for all
            		 .requestMatchers("/auth/login", "/auth/send-otp","/api/user/forgotpassword","/api/user/otpvalidation","/adminwelcome/admintest","/announcementwelcome/annoncementtest","/attendencewelcome/attendancetest","/documentwelcome/documenttest","/paymentwelcome/paymenttest","/requestwelcome/requesttest","/auth/test").permitAll()
                     // Admin Access apis
                    
                     
     						 
                      // Require authentication for any other requests
            		 
            		 // this apis for only admin
            		 .requestMatchers("/RequestFeign/findallannouncements","/announcments/findallannouncements","/api/user/grant-role", "/api/user/hrregister","/api/user/revoke-role","/api/user/team","/api/user/adminUpdateDetails","/api/user/findbyrole"
                      		,"/api/user/updatePassword","/location/ip","/location/testing-location-service","/location/location").hasAnyAuthority("Admin")
            		 
            		 
            		 
            		 // this apis only for employee
            		 .requestMatchers("/leaveBalance/availableLeaves","/leaveRequests/applyLeave","/api/user/updatemployee","/leaveRequests/findEmpleaves","/educationaldetails/saveeducationaldetails")
                     .hasAuthority("Employee")
                     
                     // this apis for admin hr and employeee
                     .requestMatchers("/attendance/logout","/attendance/id/{id}","/announceFeign/getbirthdays","/announceFeign/getnewjoiners","/announceFeign/findallannouncements","/api/user/findbyemail","/RequestFeign/addcomplaint","/RequestFeign/addannouncement","/RequestFeign/findallannouncements","/RequestFeign/findbyempnumber","/RequestFeign/login","/complaints/allcomplaints"
                    		 ,"/complaints/addcomplaint","/complaints/findbyempnumber","/AdminFeign/addannouncement","/AdminnFeign/workfromhomerequest","/announcments/findallannouncements","/workfromhome/findbyempnumber","/user/getbirthdays","/user/getnewjoiners","/api/user/currentuser")
                     
                     .hasAnyAuthority("Admin", "HR", "Employee")
                     
                     //this apis for admin hr and Special
                     .requestMatchers("/leaveBalance/addleaves","/api/user/saveeducationaldetails","/leaveRequests/rejectLeave","/api/user/team","/api/user/deleteemployee",
                     		"/api/user/findbyrole","/leaveRequests/findpendingleaves",
                     		"/bankdetails/addbankdetails","/bankdetails/findallbankdetails",
                     		"/educationaldetails/getallEducationalDetails","/leaveBalance/availableLeaves","/leaveRequests/applyLeave","/RequestFeign/documentsdownload",
                     		"/leaveRequests/findEmpleaves","/educationaldetails/saveeducationaldetails","/api/user/team","/api/user/findbyrole","/api/user/")
                     .hasAnyAuthority("HR","Special","Admin")
                     
                     //this apis for hr employee
                     
                     .requestMatchers("/documents/uploadMultiple","/documents/uploadImage/{empnumber}","/documents/updateDocuments/{empnumber}","/workfromhome/request").hasAnyAuthority("HR","Employee")

                     
                   // //this apis for hr admin
                     
                     .requestMatchers("/attendance/all","/documents/download","payroll/generate-payslips", "payroll/generate-payslip/{employeeId}","/payroll/payslip/{empId}",
                    		 "/complaints/allcomplaints","/AdminFeign/registeremp","/workfromhome/approve","/workfromhome/reject","/api/user/registeremp").hasAnyAuthority("Admin","HR")
                     
                     
                     
                     
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
        http.authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
