import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../../utils/JWT_Token';

const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 20px;
  font-weight: bold;
`;

const ChangePassword = () => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await axios.put(
        'http://localhost:2022/api/user/updatePassword',
        {
          oldEmail,
          newemail: newEmail,
          newpassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Password updated successfully:', response.data);
      setSuccessMessage('Password updated successfully!');
      setOldEmail('');
      setNewEmail('');
      setNewPassword('');
      // Handle successful password update
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error in updating password
    }
  };

  return (
    <ChangePasswordContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="oldEmail">Old Email</Label>
        <Input
          type="email"
          id="oldEmail"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
          required
        />
        <Label htmlFor="newEmail">New Email</Label>
        <Input
          type="email"
          id="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type="submit">Change Password</Button>
      </Form>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
