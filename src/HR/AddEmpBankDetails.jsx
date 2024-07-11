import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';

// Styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const AddEmpBankDetails = () => {
  const [empDetails, setEmpDetails] = useState({
    empnumber: '',
    adharnumber: '',
    pannumber: '',
    bankName: '',
    bankAccountNumber: '',
    ifsccode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:2022/bankdetails/addbankdetails', empDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Employee Bank Details Added Successfully');
      setEmpDetails({
        empnumber: '',
        adharnumber: '',
        pannumber: '',
        bankName: '',
        bankAccountNumber: '',
        ifsccode: ''
      });
    } catch (error) {
      console.error('There was an error adding the employee bank details!', error);
    }
  };

  return (
    <FormContainer>
      <Title>Add Employee Bank Details</Title>
      <form onSubmit={handleSubmit}>
        <Input 
          type="number"
          name="empnumber"
          placeholder="Employee Number"
          value={empDetails.empnumber}
          onChange={handleChange}
          required
        />
        <Input 
          type="text"
          name="adharnumber"
          placeholder="Aadhaar Number"
          value={empDetails.adharnumber}
          onChange={handleChange}
          required
        />
        <Input 
          type="text"
          name="pannumber"
          placeholder="PAN Number"
          value={empDetails.pannumber}
          onChange={handleChange}
          required
        />
        <Input 
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={empDetails.bankName}
          onChange={handleChange}
          required
        />
        <Input 
          type="text"
          name="bankAccountNumber"
          placeholder="Bank Account Number"
          value={empDetails.bankAccountNumber}
          onChange={handleChange}
          required
        />
        <Input 
          type="text"
          name="ifsccode"
          placeholder="IFSC Code"
          value={empDetails.ifsccode}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add Details</Button>
      </form>
    </FormContainer>
  );
};

export default AddEmpBankDetails;
