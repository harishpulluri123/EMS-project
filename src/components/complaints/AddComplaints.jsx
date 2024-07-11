import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../../utils/JWT_Token';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
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

const AddComplaints = () => {
  const [complaint, setComplaint] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const token = getToken();
    const id = sessionStorage.getItem('Id');
    const empnumber = sessionStorage.getItem('empNumber');

    if (!id || !empnumber) {
      setError('Session data is missing');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:2022/complaints/addcomplaint', {
        id,
        empnumber,
        complaint
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Complaint submitted successfully!');
      setComplaint('');
    } catch (error) {
      console.error('There was an error submitting the complaint:', error);
      if (error.response) {
        setError(`Error: ${error.response.status} ${error.response.statusText}`);
      } else {
        setError('There was an error submitting the complaint.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Submit a Complaint</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextArea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter your complaint here"
          rows="5"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddComplaints;
