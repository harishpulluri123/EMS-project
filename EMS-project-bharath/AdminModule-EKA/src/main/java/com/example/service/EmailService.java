package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.entity.LeaveRequest;
import com.example.entity.User;

@Service
public class EmailService {
	 @Autowired
	    private JavaMailSender mailSender;

	    @Autowired
	    private UserService userService;

	    public void sendEmailApproved(String employeeEmail, String subject, String text) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(employeeEmail);
	        message.setSubject(subject);
	        message.setText(text);
	        mailSender.send(message);
	    }

	    public void sendEmailRejected(String employeeEmail, String subject, String text) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(employeeEmail);
	        message.setSubject(subject);
	        message.setText(text);
	        mailSender.send(message);
	    }

	    public void sendEmailForLeave(String employeeEmail, String subject, String text) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(employeeEmail);
	        message.setSubject(subject);
	        message.setText(text);
	        mailSender.send(message);
	    }

	    public void notifyHrsAboutLeave(LeaveRequest leaveRequest) {
	        List<User> allHrs = userService.findallhrs();
	        String[] hrEmails = allHrs.stream().map(User::getEmail).toArray(String[]::new);
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(hrEmails);
	        message.setSubject("New Leave Request");
	        message.setText("Employee " + leaveRequest.getEmployeeName() + " has applied for leave.");
	        mailSender.send(message);
	    }
	    }
