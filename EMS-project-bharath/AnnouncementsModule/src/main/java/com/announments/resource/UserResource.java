package com.announments.resource;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.announments.dto.ResponseDto;
import com.announments.entity.User;
import com.announments.service.UserService;

@Service
public class UserResource {

	@Autowired
	UserService service;
	
	
	 public ResponseEntity<ResponseDto> findBirthdays() {
	      ResponseDto responseDto = new ResponseDto();

	      LocalDate today = LocalDate.now();
	      LocalDate futureDate = today.plusDays(20);

	      List<User> usersWithUpcomingBirthdays = service.findUsersWithBirthdaysBetween(today, futureDate);

	      if (usersWithUpcomingBirthdays.isEmpty()) {
	          responseDto.setMessage("No upcoming birthdays found");
	          responseDto.setStatus(false);
	          return new ResponseEntity<>(responseDto, HttpStatus.NOT_FOUND);
	      }

	      responseDto.setMessage("Upcoming birthdays found");
	      responseDto.setStatus(true);
	      responseDto.setListusers(usersWithUpcomingBirthdays);
	      return new ResponseEntity<>(responseDto, HttpStatus.OK);
	  }
	  public ResponseEntity<ResponseDto> findNewJoiners() {
		    ResponseDto responseDto = new ResponseDto();

		    LocalDate presentDate = LocalDate.now();
		    LocalDate pastDate = presentDate.minusDays(10); // 10 days before present date

		    List<User> newJoiners = service.findUsersWithJoiningDatesBetween(pastDate, presentDate);

		    if (newJoiners.isEmpty()) {
		        responseDto.setMessage("No new joiners found within the last 10 days.");
		        responseDto.setStatus(false);
		        return new ResponseEntity<>(responseDto, HttpStatus.NOT_FOUND);
		    }

		    responseDto.setMessage("New joiners found within the last 10 days.");
		    responseDto.setStatus(true);
		    responseDto.setListusers(newJoiners);
		    return new ResponseEntity<>(responseDto, HttpStatus.OK);
		}
}
