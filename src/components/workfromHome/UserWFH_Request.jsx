import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
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
  
  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #4CAF50;
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: ${props => (props.error ? 'red' : 'green')};
  margin-top: 15px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(FaSpinner)`
  margin-right: 8px;
  animation: ${spin} 1s linear infinite;
`;

const UserWFH_Request = () => {
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [reason, setReason] = useState('');
  const [nodays, setNodays] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startdate && enddate) {
      const start = new Date(startdate);
      const end = new Date(enddate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNodays(diffDays);
    } else {
      setNodays('');
    }
  }, [startdate, enddate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = sessionStorage.getItem('Id');
    const empnumber = sessionStorage.getItem('empNumber');
    const token = getToken();
    const status = 'pending';

    if (!id || !empnumber) {
      console.error('User ID or employee number is missing from session storage.');
      setError('User ID or employee number is missing from session storage.');
      setLoading(false);
      return;
    }

    const data = {
      id,
      empnumber,
      startdate,
      enddate,
      reason,
      nodays,
      status,
    };

    try {
      const response = await axios.post('http://localhost:2022/workfromhome/request', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('WFH request submitted successfully:', response.data);
      setMessage('WFH request submitted successfully!');
      setError(null);
      // Clear the form fields
      setStartdate('');
      setEnddate('');
      setReason('');
      setNodays('');
    } catch (error) {
      console.error('There was an error submitting the WFH request:', error);
      setError('There was an error submitting the WFH request.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Work From Home Request</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="startdate">Start Date</Label>
        <Input
          type="date"
          id="startdate"
          value={startdate}
          onChange={(e) => setStartdate(e.target.value)}
          required
        />
        
        <Label htmlFor="enddate">End Date</Label>
        <Input
          type="date"
          id="enddate"
          value={enddate}
          onChange={(e) => setEnddate(e.target.value)}
          required
        />
        
        <Label htmlFor="reason">Reason</Label>
        <TextArea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason for WFH"
          required
        />

        <Label htmlFor="nodays">Number of Days</Label>
        <Input
          type="number"
          id="nodays"
          value={nodays}
          readOnly
        />
        
        <Button type="submit" disabled={loading}>
          {loading && <SpinnerIcon />}
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
    </Container>
  );
};

export default UserWFH_Request;
