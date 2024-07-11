import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


// Styled components
const Container = styled.div`
  margin: 50px auto;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  height: 100px;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  grid-column: span 2;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${props => (props.success ? 'green' : 'red')};
  background-color: ${props => (props.success ? '#e0ffe0' : '#ffe0e0')};
`;

const CreatePaySlip = () => {
  const [paySlipData, setPaySlipData] = useState({
    id: '',
    name: '',
    email: '',
    uan: '',
    pan: '',
    designation: '',
    department: '',
    bankName: '',
    bankAccountNumber: '',
    joiningDate: '',
    basicSalary: '',
    hra: '',
    conveyanceAllowance: '',
    medicalAllowance: '',
    otherAllowance: '',
    healthInsurance: '',
    professionalTax: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaySlipData({ ...paySlipData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    try {
      const response = await axios.post('http://localhost:2022/payroll/create', paySlipData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Pay slip created successfully!');
      setError('');
      // Clear form fields after successful submission
      setPaySlipData({
        id: '',
        name: '',
        email: '',
        uan: '',
        pan: '',
        designation: '',
        department: '',
        bankName: '',
        bankAccountNumber: '',
        joiningDate: '',
        basicSalary: '',
        hra: '',
        conveyanceAllowance: '',
        medicalAllowance: '',
        otherAllowance: '',
        healthInsurance: '',
        professionalTax: ''
      });
    } catch (err) {
      console.error('Error creating pay slip:', err);
      setError('Failed to create pay slip.');
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <Title>Create Pay Slip</Title>
      {error && <Message>{error}</Message>}
      {successMessage && <Message success>{successMessage}</Message>}
      <Form onSubmit={handleSubmit}>
        {Object.keys(paySlipData).map((key) => (
          <FormField key={key}>
            <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
            {key === 'joiningDate' ? (
              <Input
                type="date"
                id={key}
                name={key}
                value={paySlipData[key]}
                onChange={handleChange}
                required
              />
            ) : (
              <Input
                type="text"
                id={key}
                name={key}
                value={paySlipData[key]}
                onChange={handleChange}
                required
              />
            )}
          </FormField>
        ))}
        <Button type="submit">Create Pay Slip</Button>
      </Form>
    </Container>
  );
};

export default CreatePaySlip;
