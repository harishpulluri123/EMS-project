package com.RequestAndComplaints.resource;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.RequestAndComplaints.dao.UserRepository;
import com.RequestAndComplaints.dto.CommonApiResponse;
import com.RequestAndComplaints.entity.User;
import com.RequestAndComplaints.entity.WorkFromHome;
import com.RequestAndComplaints.exceptions.DataNotFound;
import com.RequestAndComplaints.exceptions.WorkFromHomeRequestFailedException;
import com.RequestAndComplaints.service.EmailService;
import com.RequestAndComplaints.service.WorkFromHomeService;

@Service
public class WorkFromHomeResource {

    @Autowired
    WorkFromHomeService service;
    
    @Autowired
    EmailService emailService;
    @Autowired
    UserRepository us;

    public ResponseEntity<CommonApiResponse> addWorkFromHomeRequest(WorkFromHome work) {
        CommonApiResponse response = new CommonApiResponse();
        
        // Set status to pending
        work.setStatus("pending");

        // Ensure start date and end date are not null
        if (work.getStartdate() == null || work.getEnddate() == null) {
            response.setStatus(false);
            response.setMessage("Start date and end date must not be null");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        
        // Calculate the number of days between start date and end date
        long noOfDays = ChronoUnit.DAYS.between(work.getStartdate(), work.getEnddate()) + 1;
        work.setNodays(noOfDays);

        // Add the work from home request
        WorkFromHome addRequest = service.addrequest(work);
        if(addRequest==null) {
        throw new WorkFromHomeRequestFailedException("failed to send work from home request");
        }

        // Set the response object properties
        response.setStatus(true);
        response.setMessage("Work from home request added successfully");

        // Send notification emails
        
        User user = us.findByEmpnumber(work.getEmpnumber());
        emailService.sendRequestNotification(user.getEmail());
    

        // Return the response entity
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> approveWorkFromHomeRequest(long emmnumber) {
         List<WorkFromHome> findallpendingrequests = service.findallpendingrequests(emmnumber);
         WorkFromHome workFromHome = findallpendingrequests.get(0);
        workFromHome.setStatus("approved");
        service.addrequest(workFromHome);

        // Send notification email to employee
        User user = us.findByEmpnumber(workFromHome.getEmpnumber());
        emailService.sendApprovalNotificationToEmployee(user.getEmail());

        CommonApiResponse response = new CommonApiResponse();
        response.setStatus(true);
        response.setMessage("Work from home request approved successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> rejectWorkFromHomeRequest(long emmnumber) {
        List<WorkFromHome> findallpendingrequests = service.findallpendingrequests(emmnumber);
        WorkFromHome workFromHome = findallpendingrequests.get(0);
        workFromHome.setStatus("rejected");
        service.addrequest(workFromHome);

        // Send notification email to employee
        User user = us.findByEmpnumber(workFromHome.getEmpnumber());
        emailService.sendRejectionNotificationToEmployee(user.getEmail());

        CommonApiResponse response = new CommonApiResponse();
        response.setStatus(true);
        response.setMessage("Work from home request rejected");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    public ResponseEntity<CommonApiResponse> findByempnumber(long emmnumber) {
    	CommonApiResponse response = new CommonApiResponse();
    	
    	List<WorkFromHome> byEmpnumber = service.findByEmpnumber(emmnumber);
    	if(byEmpnumber.isEmpty()) {
    		throw new DataNotFound("no data found");
    	}
    	response.setListwork(byEmpnumber);
    	response.setMessage(" data found");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
    }
    
    public ResponseEntity<CommonApiResponse>findPendingRequests(){
    	
    	CommonApiResponse response = new CommonApiResponse();
    	List<WorkFromHome> byStatus = service.findByStatus();
    	
    	if(byStatus.isEmpty()) {
    		throw new DataNotFound("no data found");
    	}
    	response.setListwork(byStatus);
    	response.setMessage(" data found");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
    }
}
