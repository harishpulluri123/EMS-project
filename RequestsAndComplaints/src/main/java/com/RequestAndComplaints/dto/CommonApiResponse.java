package com.RequestAndComplaints.dto;

import java.util.ArrayList;
import java.util.List;

import com.RequestAndComplaints.entity.Complaints;
import com.RequestAndComplaints.entity.WorkFromHome;

import lombok.Data;

@Data
public class CommonApiResponse {

	
	private String message;
	private boolean status;
	
	private List<WorkFromHome>listwork=new ArrayList<>();
	
	private List<Complaints>listcomplaints=new ArrayList<>();
}
