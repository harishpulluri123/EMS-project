package com.RequestAndComplaints.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.RequestAndComplaints.dao.UserRepository;
import com.RequestAndComplaints.dto.CommonApiResponse;
import com.RequestAndComplaints.entity.Complaints;
import com.RequestAndComplaints.entity.User;
import com.RequestAndComplaints.exceptions.DataNotFound;
import com.RequestAndComplaints.exceptions.UserNotFoundException;
import com.RequestAndComplaints.service.ComplaintsService;

@Service
public class ComplaintsResource {

	@Autowired
	ComplaintsService service;
	@Autowired
	UserRepository dao;
	
	public ResponseEntity<CommonApiResponse> addComplaints( Complaints com) {
        CommonApiResponse response = new CommonApiResponse();

        User user = dao.findByEmpnumber(com.getEmpnumber());
        if (user == null) {
          throw new UserNotFoundException("You're not an authorized person");
        }

        Complaints addComplaints = service.addcomplaints(com);
        if (addComplaints == null) {
            response.setMessage("Failed to send complaint");
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.setMessage("Successfully sent complaint");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	public ResponseEntity<CommonApiResponse>findcomplaintsByempnumber(long empnumber){
		CommonApiResponse response = new CommonApiResponse();
		
		List<Complaints> findbyempnumber = service.findbyempnumber(empnumber);
		
		if(findbyempnumber.isEmpty()) {
			throw new DataNotFound("no complaints found");
		}
		response.setListcomplaints(findbyempnumber);
		response.setMessage("data found");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
	}
	
	public ResponseEntity<CommonApiResponse>findallcomplaints(){
		
		CommonApiResponse response = new CommonApiResponse();
		
		List<Complaints> findallcomplaints = service.findallcomplaints();
		if(findallcomplaints.isEmpty()) {
			throw new DataNotFound("no complaints found");
		}
		
		response.setListcomplaints(findallcomplaints);
		response.setMessage("data found");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
	}
}
