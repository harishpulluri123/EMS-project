package com.RequestAndComplaints.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.RequestAndComplaints.dao.UserRepository;
import com.RequestAndComplaints.entity.User;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    UserRepository userRepository;
    
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void sendRequestNotification(String employeeEmail) {
        // Send notification to employee
        String employeeSubject = "Work From Home Request Submitted";
        String employeeText = "Your work from home request has been submitted and is pending approval.";
        sendEmail(employeeEmail, employeeSubject, employeeText);
        
        // Retrieve admin email from the database
        Optional<User> adminOptional = userRepository.findByRole("Admin");
        
        // If admin exists, send notification to admin
        if (adminOptional.isPresent()) {
            String adminEmail = adminOptional.get().getEmail();
            String adminSubject = "New Work From Home Request";
            String adminText = "A new work from home request has been submitted and is pending your approval.";
            sendEmail(adminEmail, adminSubject, adminText);
        }
    }

    public void sendApprovalNotificationToEmployee(String employeeEmail) {
        String subject = "Work From Home Request Approved";
        String text = "Your work from home request has been approved.";
        sendEmail(employeeEmail, subject, text);
    }

    public void sendRejectionNotificationToEmployee(String employeeEmail) {
        String subject = "Work From Home Request Rejected";
        String text = "Your work from home request has been rejected.";
        sendEmail(employeeEmail, subject, text);
    }
    }
