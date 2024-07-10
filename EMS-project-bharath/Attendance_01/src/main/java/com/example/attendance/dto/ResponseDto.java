package com.example.attendance.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.attendance.model.Announcement;
import com.example.attendance.model.User;

import lombok.Data;

@Data
public class ResponseDto extends CommonApiResponse {
	
	private List<Announcement>listannounce=new ArrayList<>();
	
	private List<User>listusers=new ArrayList<>();

}
