package com.example.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.dto.CommonApiResponse;

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

	@ExceptionHandler(UserSaveFailedException.class)
	public ResponseEntity<CommonApiResponse> handleUserRegistrationFailedException(UserSaveFailedException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setMessage(responseMessage);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

	}
	@ExceptionHandler(MissingInputException.class)
	public ResponseEntity<CommonApiResponse>handleMissinginputException(MissingInputException m){
		
		String message = m.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();
		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(BankDetailsAddFailedException.class)
	public ResponseEntity<CommonApiResponse>handlebankdetailfailedexceptions(BankDetailsAddFailedException ex){
		String message = ex.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@ExceptionHandler(EducationDetailsFaileToAddException.class)
	public ResponseEntity<CommonApiResponse>handleeducationdetailsfailedException(EducationDetailsFaileToAddException ex){
		String message = ex.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	

	@ExceptionHandler(LeaveBalanceAddFailedException.class)
	public ResponseEntity<CommonApiResponse>handleleavebalnceException(LeaveBalanceAddFailedException ex){
		String message = ex.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setMessage(message);
		apiResponse.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	 @ExceptionHandler(BadRequestException.class)
	    public ResponseEntity<String> handleBadRequestException(BadRequestException ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	    }

	
}
