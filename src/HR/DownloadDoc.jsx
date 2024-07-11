import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../utils/JWT_Token';

const DownloadDoc = () => {
  const [userData, setUserData] = useState([]);
  const [documentTypes, setDocumentTypes] = useState({}); // State to hold document types for each user

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken(); // Assuming getToken retrieves the JWT token
        const response = await axios.get('http://localhost:2022/api/user/allusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const users = response.data.user; // Assuming response.data.user contains an array of user objects
          setUserData(users.filter(user => user.role !== 'Admin')); // Filter out users with role Admin
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once on mount

  const getDownloadUrl = async (userId, docType) => {
    const token = getToken(); // Assuming getToken retrieves the JWT token
    const url = `http://localhost:2022/documents/download?empnumber=${userId}&documentType=${docType}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data.url; // Assuming the server responds with a URL
      } else {
        console.error('Failed to fetch document URL');
        return '';
      }
    } catch (error) {
      console.error('Error fetching document URL:', error);
      return '';
    }
  };

  const handleDocumentTypeChange = (userId, value) => {
    setDocumentTypes((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  return (
    <Wrapper>
      <h2>User Data</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Emp Number</th>
            <th>Name</th>
            <th>Document Type</th>
            <th >Download</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userData) && userData.map((user) => {
            const name = `${user.firstname || ''} ${user.middlename || ''} ${user.lastname || ''}`.trim();
            const userDocumentType = documentTypes[user.empNumber] || ''; // Default to empty if not set
            return (
              <tr key={user.id}>
                <td>{user.empNumber}</td>
                <td>{name}</td>
                <td>
                  <SelectDocumentType
                    value={userDocumentType}
                    onChange={(e) => handleDocumentTypeChange(user.empNumber, e.target.value)}
                  >
                    <option value="">Select one</option>
                    <option value="degreememo">Degree Certificate</option>
                    <option value="pancard">PAN Card</option>
                    <option value="sscmemo">SSC Card</option>
                    <option value="voterid">Voter Card</option>
                    {/* Add more options as needed */}
                  </SelectDocumentType>
                </td>
                <td>
                  {userDocumentType && (
                    <DownloadButton
                      onClick={async () => {
                        const url = await getDownloadUrl(user.empNumber, userDocumentType);
                        if (url) {
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      Download
                    </DownloadButton>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px; /* Adjust max-width as needed */
  margin-left:15rem;
margin-top: 2rem;
`;

const StyledTable = styled.table`
  width: 80%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 12px; /* Reduced padding for cells */
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    padding: 12px; /* Larger padding for headers */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const SelectDocumentType = styled.select`
  padding: 6px; /* Adjusted padding for compactness */
  font-size: 14px; /* Reduced font size */
`;

const DownloadButton = styled.button`
  padding: 6px 12px; /* Adjusted padding */
  font-size: 15px; /* Reduced font size */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default DownloadDoc;
