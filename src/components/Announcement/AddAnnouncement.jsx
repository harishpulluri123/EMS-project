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

const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  color: ${props => props.success ? 'green' : 'red'};
  margin-top: 10px;
`;

const AddAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const id = sessionStorage.getItem('Id');
    const empnumber = sessionStorage.getItem('empNumber');
    const token = getToken();

    console.log(id + " id");
    console.log(empnumber + "Empnumber");
    console.log(token + "Token");
    
    if (!id || !empnumber) {
      setMessage({ text: 'User ID or employee number is missing from session storage.', success: false });
      return;
    }

    const data = {
      id,
      empnumber,
      announcement,
    };

    try {
      const response = await axios.post('http://localhost:2022/announcments/addannouncement', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Announcement added successfully:', response.data);
      setAnnouncement('');
      setMessage({ text: 'Announcement added successfully!', success: true });
    } catch (error) {
      console.error('There was an error adding the announcement:', error);
      setMessage({ text: 'There was an error adding the announcement. Please try again.', success: false });
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Add Announcement</h2>
        <form onSubmit={handleSubmit}>
          <TextBox
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter your announcement here..."
          />
          <Button type="submit">Submit</Button>
        </form>
        {message && <Message success={message.success}>{message.text}</Message>}
      </FormWrapper>
     
    </Container>
  );
};

export default AddAnnouncement;
