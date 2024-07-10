package com.example.security;

import java.util.logging.Level;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserResource {

	

	@Autowired
	private UserService service;

	
	 @Autowired 
	 private AuthenticationManager authenticationManager;
	 

	
	 // @Autowired private PasswordEncoder passwordEncoder;
	 
@Autowired
	PasswordEncoder encoder;
	
	
	  @Autowired private JwtUtils jwtUtils;
	 

	@Autowired
	private OtpService otpService;
	
	
	  //login api
	public ResponseEntity<UserLoginResponse> login(UserLoginRequest
	  loginRequest) { UserLoginResponse response = new UserLoginResponse();
	  
	  if (loginRequest == null) { response.setMessage("Missing input");
	  response.setStatus(false); return new ResponseEntity<>(response,
	  HttpStatus.BAD_REQUEST); }
	  
	  String jwtToken; User user;
	  
	  // List<GrantedAuthority> authorities = Arrays.asList(new
	  //SimpleGrantedAuthority(loginRequest.getRole()));
	  
	  try { if (loginRequest.getOtp() != null && !loginRequest.getOtp().isEmpty())
	  { if (!otpService.validateOtp(loginRequest.getEmailId(),
	  loginRequest.getOtp())) { response.setMessage("Invalid OTP.");
	  response.setStatus(false); return new ResponseEntity<>(response,
	  HttpStatus.BAD_REQUEST); } } else { authenticationManager.authenticate(new
	  UsernamePasswordAuthenticationToken( loginRequest.getEmailId(),
	  loginRequest.getPassword())); } } catch (Exception ex) {
	 // logger.log(Level.SEVERE, "Authentication failed", ex);
	  response.setMessage("Invalid email or password."); response.setStatus(false);
	  return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); }
	  
	  jwtToken = jwtUtils.generateToken(loginRequest.getEmailId()); user =
	  service.getbyemail(loginRequest.getEmailId());
	  
	  if (jwtToken != null) { response.setUser(user);
	  response.setMessage("Logged in successfully"); response.setStatus(true);
	  response.setJwtToken(jwtToken); return new ResponseEntity<>(response,
	  HttpStatus.OK); } else { response.setMessage("Login failed");
	  response.setStatus(false); return new ResponseEntity<>(response,
	  HttpStatus.BAD_REQUEST); } }
	 
	 
//otp send
	public ResponseEntity<CommonApiResponse> sendOtp(OtpRequest otpRequest) {
		CommonApiResponse response = new CommonApiResponse();

		if (otpRequest == null || otpRequest.getEmail() == null) {
			response.setMessage("Missing email");
			response.setStatus(false);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		User getbyemail = service.getbyemail(otpRequest.getEmail());
		if (getbyemail != null) {
			try {
				otpService.generateAndSendOtp(otpRequest.getEmail());
				response.setMessage("OTP sent successfully");
				response.setStatus(true);
				return new ResponseEntity<>(response, HttpStatus.OK);
			} catch (Exception e) {
				//logger.log(Level.SEVERE, "Failed to send OTP", e);
				response.setMessage("Failed to send OTP");
				response.setStatus(false);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else
			response.setMessage("Give proper email");
		response.setStatus(false);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);

	}

}
