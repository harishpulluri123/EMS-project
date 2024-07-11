import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';
import styled from 'styled-components';

const UserTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const AllDataContainer = styled.div`
  width:60%;
 margin-left:20rem;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AllUser = () => {
  const [usersData, setUsersData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:2022/api/user/allusers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <AllDataContainer>
      <h2 >All Users</h2>
      <UserTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.status &&
            usersData.user &&
            Array.isArray(usersData.user) &&
            usersData.user.map((user) => (
              <Tr key={user.id} className={selectedUserId === user.id ? 'active' : ''}>
                <Td>{user.id}</Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td>
                  <Button onClick={() => handleUserClick(user.id)}>View Details</Button>
                </Td>
              </Tr>
            ))}
        </tbody>
      </UserTable>
      {selectedUserId !== null && usersData && usersData.status && usersData.user && Array.isArray(usersData.user) && (
        <div>
          <h3>User Details</h3>
          <UserTable>
            <tbody>
              {usersData.user.map((user) => {
                if (user.id === selectedUserId) {
                  return (
                    <React.Fragment key={user.id}>
                      <Tr>
                        <Td>ID:</Td>
                        <Td>{user.id}</Td>
                      </Tr>
                      <Tr>
                        <Td>First Name:</Td>
                        <Td>{user.firstname}</Td>
                      </Tr>
                      <Tr>
                        <Td>Last Name:</Td>
                        <Td>{user.lastname}</Td>
                      </Tr>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </tbody>
          </UserTable>
        </div>
      )}
    </AllDataContainer>
  );
};

export default AllUser;
