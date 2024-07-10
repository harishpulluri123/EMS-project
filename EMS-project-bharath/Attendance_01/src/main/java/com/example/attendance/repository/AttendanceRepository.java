package com.example.attendance.repository;

import com.example.attendance.model.Attendance;
import com.example.attendance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserId(Long userId);

	List<Attendance> findByUserAndLoginTimeBetween(User user, LocalDateTime minusDays, LocalDateTime now);

	Optional<User> findByUserIdAndStatus(Long userId, String string);

    Optional<Attendance> findFirstByUserIdOrderByLoginTimeDesc(Long userId);

	Optional<Attendance> findFirstByUserIdAndStatusOrderByLoginTimeDesc(Long userId, String string);

}
