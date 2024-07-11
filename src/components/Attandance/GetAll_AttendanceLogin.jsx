import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../../utils/JWT_Token';

// Styled components
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Table = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Message = styled.p`
  color: ${props => (props.error ? 'red' : 'green')};
`;

const GetAll_AttendanceLogin = () => {
  const [logins, setLogins] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogins = async () => {
      setLoading(true);
      setMessage('');
      setError('');
      const token = getToken();
      try {
        const response = await axios.get('http://localhost:2022/attendance/all', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          // Convert loginTime and logoutTime arrays to Date objects
          const formattedLogins = response.data.map(login => ({
            ...login,
            loginTime: new Date(...login.loginTime),
            logoutTime: login.logoutTime ? new Date(...login.logoutTime) : null,
          }));
          setLogins(formattedLogins);
          setMessage('Data fetched successfully.');
        } else {
          setError('Failed to fetch data.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogins();
  }, []);

  return (
    <Container>
      <h1>All Attendance Logins</h1>
      {loading ? <p>Loading...</p> : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Employee ID</TableHeader>
              <TableHeader>Employee Name</TableHeader>
              <TableHeader>Clock In Time</TableHeader>
              <TableHeader>Clock Out Time</TableHeader>
            </tr>
          </thead>
          <tbody>
            {logins.map((login, index) => (
              <TableRow key={index}>
                <TableCell>{login.id}</TableCell>
                <TableCell>{login.user.firstname}</TableCell>
                <TableCell>{login.loginTime.toLocaleString()}</TableCell>
                <TableCell>{login.logoutTime ? login.logoutTime.toLocaleString() : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
    </Container>
  );
};

export default GetAll_AttendanceLogin;
