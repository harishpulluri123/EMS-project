import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 80%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const GetUserBankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:2022/bankdetails/findallbankdetails', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data.listBankdetails)
        if (Array.isArray(response.data.listBankdetails)) {
          setBankDetails(response.data.listBankdetails);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        setError('There was an error fetching the bank details!');
        console.error(error);
      }
    };

    fetchBankDetails();
  }, []);

  return (
    <Container>
      <Title>User Bank Details</Title>
      {error ? (
        <p>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Employee Number</Th>
              <Th>Aadhaar Number</Th>
              <Th>PAN Number</Th>
              <Th>Bank Name</Th>
              <Th>Bank Account Number</Th>
            </tr>
          </thead>
          <tbody>
            {bankDetails.map(detail => (
              <tr key={detail.id}>
                <Td>{detail.id}</Td>
                <Td>{detail.empnumber}</Td>
                <Td>{detail.adharnumber}</Td>
                <Td>{detail.pannumber}</Td>
                <Td>{detail.bankName}</Td>
                <Td>{detail.bankAccountNumber}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GetUserBankDetails;
