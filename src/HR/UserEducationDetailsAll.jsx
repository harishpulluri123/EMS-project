import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';

const UserEducationDetailsAll = () => {
  const [educationalDetails, setEducationalDetails] = useState([]);

  useEffect(() => {
    fetchEducationalDetails();
  }, []);

  const fetchEducationalDetails = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:2022/educationaldetails/getallEducationalDetails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && Array.isArray(response.data.listEducationDetails)) {
        setEducationalDetails(response.data.listEducationDetails);
      } else {
        console.error('API response does not contain listEducationDetails array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching educational details:', error);
    }
  };

  return (
    <Wrapper>
      <Title>User Education Details</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Employee Number</Th>
            <Th>Graduation College/Institute</Th>
            <Th>Graduation University/Board</Th>
            <Th>Graduation Passed Out Year</Th>
            <Th>Graduation Marks/CGPA</Th>
            <Th>Graduation Branch</Th>
            <Th>Graduation City</Th>
            <Th>Inter College/Institute</Th>
            <Th>Inter University/Board</Th>
            <Th>Inter Passed Out Year</Th>
            <Th>Inter Marks/CGPA</Th>
            <Th>Inter Branch</Th>
            {/* <Th>Inter City</Th>
            <Th>SSC College/Institute</Th>
            <Th>SSC University/Board</Th>
            <Th>SSC Passed Out Year</Th>
            <Th>SSC Marks/CGPA</Th>
            <Th>SSC City</Th> */}
          </tr>
        </thead>
        <tbody>
          {educationalDetails.map(detail => (
            <TableRow key={detail.id}>
              <TableCell>{detail.id}</TableCell>
              <TableCell>{detail.empnumber}</TableCell>
              <TableCell>{detail.graduationcollegeOrInstitute}</TableCell>
              <TableCell>{detail.graduationUniversityOrBord}</TableCell>
              <TableCell>{detail.graduationpassedOutYear}</TableCell>
              <TableCell>{detail.graduationMarksOrCGPA}</TableCell>
              <TableCell>{detail.graduationBranch}</TableCell>
              <TableCell>{detail.graduationCity}</TableCell>
              <TableCell>{detail.intercollegeOrInstitute}</TableCell>
              <TableCell>{detail.interUniversityOrBord}</TableCell>
              <TableCell>{detail.interpassedOutYear}</TableCell>
              <TableCell>{detail.intermarksOrCGPA}</TableCell>
              <TableCell>{detail.interBranch}</TableCell>
              {/* <TableCell>{detail.interCity}</TableCell>
              <TableCell>{detail.ssccollegeOrInstitute}</TableCell>
              <TableCell>{detail.sscuniversityOrBord}</TableCell>
              <TableCell>{detail.sscpassedOutYear}</TableCell>
              <TableCell>{detail.sscmarksOrCGPA}</TableCell>
              <TableCell>{detail.sscCity}</TableCell> */}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f9f9f9;
`;

const Th = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #e1e1e1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

export default UserEducationDetailsAll;
