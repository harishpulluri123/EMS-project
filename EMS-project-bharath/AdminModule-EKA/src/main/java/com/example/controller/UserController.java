package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.AdminPasswordAndEmailUpdate;
import com.example.dto.AdminUpdateDetailsDto;
import com.example.dto.CommonApiResponse;
import com.example.dto.OTPValidation;
import com.example.dto.OtpRequest;
import com.example.dto.RequestUserDto;
import com.example.dto.UserLoginRequest;
import com.example.dto.UserLoginResponse;
import com.example.dto.UserResponseDto;

import com.example.resource.UserResource;
@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserResource resource;

    //hr registeration api
    @PostMapping("/hrregister")
    public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RequestUserDto request) {
        return this.resource.registerUser(request);
    }

    
    
    
    
	
	/*
	 * //login api for all
	 * 
	 * @PostMapping("/login") public ResponseEntity<UserLoginResponse>
	 * login(@RequestBody UserLoginRequest userLoginRequest) { return
	 * resource.login(userLoginRequest); }
	 * 
	 * 
	 * //login otp send api
	 * 
	 * @PostMapping("/send-otp") public ResponseEntity<CommonApiResponse>
	 * sendOtp(@RequestBody OtpRequest otpRequest) { return
	 * resource.sendOtp(otpRequest); }
	 */
    //find user by email
    
    @GetMapping(value = "/findbyemail")
    public ResponseEntity<UserResponseDto>findbyemail( @RequestParam ("email") String email){
    	return resource.findbyemail(email);
    }
    
    
    @GetMapping("/currentuser")
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        return resource.getCurrentUser();
    }
    
    
    
//fetch all members in the organization api
    @GetMapping("/allusers")
    //@PreAuthorize("hasAnyAuthority('Admin', 'Special')")
    public ResponseEntity<UserResponseDto> allUsers() {
        return resource.fetchAllUsers();
    }
    //Admin special permission given api 
    @PostMapping("/grant-role")
    //@PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<CommonApiResponse> grantRole(@RequestParam ("email") String email) {
        return resource.grantRole(email);
    }
    //Admin special permission remove api 
    @PostMapping("/revoke-role")
    //@PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<CommonApiResponse> revokeRole(@RequestParam ("email") String email) {
        return resource.revokeRole(email);
    }
    
   //employee registration api
    @PostMapping("/registeremp")
    public ResponseEntity<CommonApiResponse> emregisterUser(@RequestBody RequestUserDto request) {
     
        return this.resource.registeremployeeUser(request);
    }
    
    
    //employee update his details api its only update name and mobile number
    @PutMapping(value = "/updatemployee")
    public ResponseEntity<CommonApiResponse>updateemployee(@RequestParam ("name") String name,@RequestParam ("mobileno") Long mobileno,@RequestParam ("email") String email){
    	return resource.updateemployee(name, mobileno, email);
    }
    
    //find by role api its works for any role
    
    @GetMapping(value = "/findbyrole")
    public ResponseEntity<UserResponseDto>findbyrole(String role){
    	return resource.findbyrole(role);
    }
    
    //remove employee a[i
    @PutMapping(value = "/deleteemployee")
    public ResponseEntity<CommonApiResponse>deleteemployee(@RequestParam ("email") String email){
    	return resource.deleteemployee( email);
    }
    
	/*
	 * //find by position api
	 * 
	 * @GetMapping(value = "/team") public
	 * ResponseEntity<UserResponseDto>findbyposition(@RequestParam String
	 * Designation){ return resource.findbyposition(Designation); }
	 */
    //update admin details
    @PutMapping(value = "/adminUpdateDetails")
    public ResponseEntity<CommonApiResponse>updateAdminDetails(@RequestBody AdminUpdateDetailsDto dto){
    	return resource.updateAdminDetails(dto);
    }
    //otp validation for admin at the of changing password and email this api hit after sending the send otp
    @PostMapping(value = "/otpvalidation")
    public ResponseEntity<CommonApiResponse>validateOTP(@RequestBody OTPValidation dto){
    	return resource.OTPValidation(dto);
    }
    //after otp validation admin have access this api to change email id and password
    @PutMapping(value = "/updatePassword")
    public ResponseEntity<CommonApiResponse>adminUpdatePasswordEmail(@RequestBody AdminPasswordAndEmailUpdate dto){
    	return resource.updatAdminPasswordAndEmail(dto);
    }
    
    
    //apis for forgotpassword this api access after complition of otp validation
    
    @PutMapping("/forgotpassword")
    public String forgotpassword(@RequestParam  ("email") String email,@RequestParam ("newpassword") String newpassword,@RequestParam ("confirmpassword") String confirmpassword) {
    	return resource.forgotpasswordpassword(email, newpassword, confirmpassword);
    }
}