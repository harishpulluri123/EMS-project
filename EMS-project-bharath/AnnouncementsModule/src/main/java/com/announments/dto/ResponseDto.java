package com.announments.dto;

import java.util.ArrayList;
import java.util.List;

import com.announments.entity.Announcement;
import com.announments.entity.User;

import lombok.Data;

@Data
public class ResponseDto extends CommonApiResponse {
	
	private List<Announcement>listannounce=new ArrayList<>();
	
	private List<User>listusers=new ArrayList<>();

}
