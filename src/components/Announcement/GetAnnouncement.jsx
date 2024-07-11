import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../../utils/JWT_Token';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  width: 100%;
  max-width: 500px;
`;

const CardHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

const CardBody = styled.div`
  font-size: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 15px;
  background-color: #fafafa;
`;

const GetAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = getToken();
      
      try {
        const response = await axios.get('http://localhost:2022/announcments/findallannouncements', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const listannounce = response.data.listannounce;
        // Ensure the response data is an array
        if (Array.isArray(listannounce)) {
          setAnnouncements(listannounce);
        } else {
          setError('Invalid response from server');
          console.error('Invalid response:', listannounce);
        }
      } catch (error) {
        setError('There was an error fetching the announcements.');
        console.error(error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Container>
      <h2>Announcements</h2>
      {error && <p>{error}</p>}
      {announcements.length === 0 && !error && <p>No announcements found.</p>}
      {announcements.map((announcement, index) => (
        <Card key={index}>
          <CardHeader>{announcement.user.firstname}</CardHeader>
          <CardBody>{announcement.announcement}</CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default GetAnnouncement;
