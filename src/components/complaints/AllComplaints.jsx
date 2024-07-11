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
`;

const CardBody = styled.div`
  font-size: 16px;
`;

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = getToken();
      try {
        const response = await axios.get('http://localhost:2022/complaints/allcomplaints', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setComplaints(response.data.listcomplaints || []);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the complaints:', error);
        setError('There was an error fetching the complaints.');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h2>All Complaints</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {complaints.length === 0 && <p>No complaints found.</p>}
      {complaints.map((complaint) => (
        <Card key={complaint.id}>
          <CardHeader>{`Employee Number: ${complaint.empnumber}`}</CardHeader>
          <CardBody>
            <p>{`Complaint: ${complaint.complaint}`}</p>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default AllComplaints;
