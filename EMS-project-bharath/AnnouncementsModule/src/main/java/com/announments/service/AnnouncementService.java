package com.announments.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.announments.dao.AnnouncementsDao;
import com.announments.entity.Announcement;

@Service
public class AnnouncementService {

	@Autowired
	AnnouncementsDao dao;
	
	
	public Announcement addannouncemnt(Announcement announ) {
		return dao.save(announ);
	}
	public List<Announcement>findall(){
		return dao.findAll();
	}
}
