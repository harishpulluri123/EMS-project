package com.example.attendance.service;

import com.example.attendance.dto.AttendanceDTO;

import java.util.List;
import java.util.Map;

public interface AttendanceService {
    
  List<AttendanceDTO> getAttendanceForUser(Long userId);
  AttendanceDTO getById(Long id);

  List<AttendanceDTO> getAll();
 
  
}
