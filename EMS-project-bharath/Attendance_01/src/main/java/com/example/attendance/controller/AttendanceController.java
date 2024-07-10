// controller/AttendanceController.java
package com.example.attendance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.dto.AttendanceDTO;
import com.example.attendance.service.impl.AttendanceServiceImpl;
import com.example.config.NetworkUtils;
 
 
@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceServiceImpl attendanceService;

    @Autowired
    private LocationController locationController;
    
    
    @PostMapping("/login")
    public AttendanceDTO login(@RequestParam Long userId) {
        String ipAddress = NetworkUtils.getLocalIpAddress(); // Assume this is a utility method to get local IP
        String location = locationController.fetchLocationForIp(ipAddress);
        return attendanceService.login(userId, ipAddress, location);
    }

    @PostMapping("/logout")
    public AttendanceDTO logout(@RequestParam Long userId) {
        String ipAddress = NetworkUtils.getLocalIpAddress(); // Assume this is a utility method to get local IP
        String location = locationController.fetchLocationForIp(ipAddress);
        return attendanceService.logout(userId, ipAddress, location);
    }
    @GetMapping("/all")
    public List<AttendanceDTO> getAllAttendances() {
        return attendanceService.getAll();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<AttendanceDTO> getById(@PathVariable Long id) {
        AttendanceDTO attendance = attendanceService.getById(id);
        if (attendance != null) {
            return ResponseEntity.ok(attendance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}