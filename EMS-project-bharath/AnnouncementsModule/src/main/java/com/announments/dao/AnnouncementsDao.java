package com.announments.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.announments.entity.Announcement;

@Repository
public interface AnnouncementsDao extends JpaRepository<Announcement, Integer>{

}
