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
            	
                .requestMatchers("/api/user/login", "api/user/send-otp","/backendtest").permitAll()
                // Admin Access apis
                .requestMatchers("/api/user/grant-role", "/api/user/register","/api/user/revoke-role","/api/user/team","/api/user/adminUpdateDetails"
                		,"/api/user/otpvalidation","/api/user/updatePassword","/complaints/allcomplaints","/location/location")
                .hasAnyAuthority("Admin","Special")
                //HR access apis
                .requestMatchers("/leaveBalance/addleaves","/api/user/registeremp","/api/user/saveeducationaldetails","/api/user/team","/api/user/deleteemployee","/api/user/findbyrole"
                		)
                .hasAuthority("HR")
                .requestMatchers("/leaveBalance/availableLeaves","/leaveRequests/applyLeave","/api/user/updatemployee","/leaveRequests/findEmpleaves","/educationaldetails/saveeducationaldetails","/attendance/clockin","/attendance/clockout","/complaints/addcomplaint","/complaints/findbyempnumber","/documents/uploadMultiple","/documents/emp/{empnumber}","/documents/uploadImage/{empnumber}",
                		"/documents/updateDocuments/{empnumber}","/workfromhome/request")
                .hasAnyAuthority("Employee","HR")
                // Common access for all authenticated users
                .requestMatchers("/api/user/findbye/mail","/api/user/allusers","/announcments/addannouncement","/announcments/findallannouncements",
                		"/attendance/all","/attendance/id/{id}","/workfromhome/findbyempnumber","/api/user/findbyemail","/api/user/currentuser","/api/user/getbirthdays","/api/user/getnewjoiners","/location/ip").hasAnyAuthority("Admin", "HR", "Employee","Special")
                
               
                
                .requestMatchers("/bankdetails/addbankdetails","/bankdetails/findallbankdetails","/educationaldetails/getallEducationalDetails","/workfromhome/approve","/workfromhome/reject","/workfromhome/allpendingRequests","documents/download","/payroll/generate-payslips","/payroll/generate-payslip/{employeeId}","/payroll/payslip/{payslipId}","/payroll/**","/leaveRequests/approveLeave","/leaveRequests/rejectLeave","/leaveRequests/findpendingleaves").hasAnyAuthority("HR","Admin","Special")
                
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

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