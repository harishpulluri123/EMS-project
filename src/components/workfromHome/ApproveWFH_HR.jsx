import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../../utils/JWT_Token';
import { FaSpinner } from 'react-icons/fa';

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  
  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const RejectButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;

const Spinner = styled(FaSpinner)`
  margin-left: 8px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ApproveWFH_HR = () => {
  const [requests, setRequests] = useState([]);
  const [loadingRequestId, setLoadingRequestId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = getToken();
      try {
        const response = await axios.get('http://localhost:2022/workfromhome/allpendingRequests', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.listwork) {
          setRequests(response.data.listwork);
        } else {
          setRequests([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the pending WFH requests:', error);
        setError('There was an error fetching the pending WFH requests.');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (empnumber) => {
    if (loadingRequestId !== null) return; // Prevent multiple requests

    setLoadingRequestId(empnumber);
    const token = getToken();
    try {
      const response = await axios.put(`http://localhost:2022/workfromhome/approve?empnumber=${empnumber}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('WFH request approved successfully!');
      setRequests(requests.filter(request => request.empnumber !== empnumber));
    } catch (error) {
      console.error('There was an error approving the WFH request:', error);
      setError('There was an error approving the WFH request.');
    } finally {
      setLoadingRequestId(null);
    }
  };

  const handleReject = async (empnumber) => {
    if (loadingRequestId !== null) return; // Prevent multiple requests

    setLoadingRequestId(empnumber);
    const token = getToken();
    try {
      const response = await axios.put(`http://localhost:2022/workfromhome/reject?empnumber=${empnumber}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('WFH request rejected successfully!');
      setRequests(requests.filter(request => request.empnumber !== empnumber));
    } catch (error) {
      console.error('There was an error rejecting the WFH request:', error);
      setError('There was an error rejecting the WFH request.');
    } finally {
      setLoadingRequestId(null);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h2>Approve Work From Home Requests</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {requests.length === 0 && <p>No pending WFH requests.</p>}
      {requests.map((request) => (
        <Card key={request.empnumber}>
          <CardHeader>{`Employee Number: ${request.empnumber}`}</CardHeader>
          <CardBody>
            <p>{`Start Date: ${request.startdate}`}</p>
            <p>{`End Date: ${request.enddate}`}</p>
            <p>{`Reason: ${request.reason}`}</p>
            <p>{`Number of Days: ${request.nodays}`}</p>
            <ButtonContainer>
              <Button 
                onClick={() => handleApprove(request.empnumber)} 
                disabled={loadingRequestId !== null}
              >
                Approve
                {loadingRequestId === request.empnumber && <Spinner />}
              </Button>
              <RejectButton 
                onClick={() => handleReject(request.empnumber)} 
                disabled={loadingRequestId !== null}
              >
                Reject
                {loadingRequestId === request.empnumber && <Spinner />}
              </RejectButton>
            </ButtonContainer>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default ApproveWFH_HR;
