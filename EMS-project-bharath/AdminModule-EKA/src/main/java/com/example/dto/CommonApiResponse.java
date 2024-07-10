package com.example.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.entity.Complaints;

import lombok.Data;

@Data
public class CommonApiResponse {

	private String message;
	private boolean status;
	
	
	private List<Complaints>listcomplaints=new ArrayList<>();
}
