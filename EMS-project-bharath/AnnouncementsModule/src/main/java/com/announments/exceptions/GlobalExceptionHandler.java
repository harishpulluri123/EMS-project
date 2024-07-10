package com.announments.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.announments.dto.CommonApiResponse;
import com.announments.feign.BadRequestException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<CommonApiResponse> handleUserNotFoundException(UserNotFoundException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setMessage(responseMessage);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	
	@ExceptionHandler(DataNotFound.class)
	public ResponseEntity<CommonApiResponse>handleMissinginputException(DataNotFound m){
		
		String message = m.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();
		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(AnnouncementAddFailedException.class)
	public ResponseEntity<CommonApiResponse>handleMissinginputException(AnnouncementAddFailedException m){
		
		String message = m.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();
		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
		
	}
	
	 @ExceptionHandler(BadRequestException.class)
	    public ResponseEntity<String> handleBadRequestException(BadRequestException ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	    }
}
