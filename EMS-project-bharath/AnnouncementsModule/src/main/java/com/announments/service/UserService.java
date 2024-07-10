package com.announments.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.announments.dao.UserDao;
import com.announments.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao dao;
	
	public User findbyempnumber(long empnumber) {
		return dao.findByEmpnumber(empnumber);
	}
	 public List<User> findUsersWithBirthdaysBetween(LocalDate startDate, LocalDate endDate) {
	        List<User> usersWithUpcomingBirthdays;

	        int startMonth = startDate.getMonthValue();
	        int startDay = startDate.getDayOfMonth();
	        int endMonth = endDate.getMonthValue();
	        int endDay = endDate.getDayOfMonth();

	        if (startMonth == endMonth) {
	            usersWithUpcomingBirthdays = dao.findUsersWithBirthdaysInMonthAndDayRange(startMonth, startDay, endDay);
	        } else {
	            usersWithUpcomingBirthdays = dao.findUsersWithBirthdaysInMonthAndDayRangeAcrossMonths(startMonth, startDay, endMonth, endDay);
	        }

	        return usersWithUpcomingBirthdays;
	    }
		
		 public List<User> findUsersWithJoiningDatesBetween(LocalDate startDate, LocalDate endDate) {
		        return dao.findUsersWithJoiningDatesBetween(startDate, endDate);
		    }
	 
	 public User getbyemail(String email) {
			return dao.findByEmail(email);
		}
}
