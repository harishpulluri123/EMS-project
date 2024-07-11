import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../../utils/JWT_Token';
import GetAll_AttendanceLogin from './GetAll_AttendanceLogin';

// Styled components
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${props => (props.error ? 'red' : 'green')};
`;

const TimeDisplay = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const AttendanceLogIn = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (clockInTime && !clockOutTime) {
        setElapsedTime(new Date(new Date() - clockInTime));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [clockInTime, clockOutTime]);

  const handleClockIn = () => {
    const empId = sessionStorage.getItem('Id'); // empId is in database Id
    console.log(empId);
    if (empId) {
      clockIn(empId);
    } else {
      setError('Employee ID not found in session storage.');
    }
  };

  const handleClockOut = () => {
    const empId = sessionStorage.getItem('Id'); // empId is in database Id
    console.log(empId);
    if (empId) {
      clockOut(empId);
    } else {
      setError('Employee ID not found in session storage.');
    }
  };

  const clockIn = async (empId) => {
    setLoading(true);
    setMessage('');
    setError('');
    const token = getToken();
    try {
      const response = await axios.post(
        `http://localhost:2022/attendance/clockin?userId=${empId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setClockInTime(new Date());
        setClockOutTime(null); // Reset clock out time
        setElapsedTime(null); // Reset elapsed time
        setMessage('Clock in successful.');
      } else {
        setError('Clock in failed.');
      }
    } catch (err) {
      console.error('Error during clock in:', err);
      setError('An error occurred while clocking in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clockOut = async (empId) => {
    setLoading(true);
    setMessage('');
    setError('');
    const token = getToken();
    try {
      const response = await axios.post(
        `http://localhost:2022/attendance/clockout?userId=${empId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setClockOutTime(new Date());
        setMessage('Clock out successful.');
      } else {
        setError('Clock out failed.');
      }
    } catch (err) {
      console.error('Error during clock out:', err);
      setError('An error occurred while clocking out. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatElapsedTime = (elapsedTime) => {
    if (!elapsedTime) return '';
    const hours = String(elapsedTime.getUTCHours()).padStart(2, '0');
    const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      <h1>Attendance Log In</h1>
      <TimeDisplay>Current Time: {currentTime.toLocaleTimeString()}</TimeDisplay>
      <Button onClick={handleClockIn} disabled={loading || clockInTime && !clockOutTime}>
        {loading ? 'Clocking In...' : 'Clock In'}
      </Button>
      <Button onClick={handleClockOut} disabled={loading || !clockInTime || clockOutTime}>
        {loading ? 'Clocking Out...' : 'Clock Out'}
      </Button>
      {clockInTime && <TimeDisplay>Clocked in at: {clockInTime.toLocaleTimeString()}</TimeDisplay>}
      {clockOutTime && <TimeDisplay>Clocked out at: {clockOutTime.toLocaleTimeString()}</TimeDisplay>}
      {elapsedTime && <TimeDisplay>Elapsed Time: {formatElapsedTime(elapsedTime)}</TimeDisplay>}
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
      {/* <GetAll_AttendanceLogin /> */}
    </Container>
  );
};

export default AttendanceLogIn;
