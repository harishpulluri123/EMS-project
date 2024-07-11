import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProfileUpdate from './ProfileUpdate';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/JWT_Token';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const token =getToken();
                // Request user data using the token
                const userResponse = await axios.get('http://localhost:2022/api/user/currentuser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Extract user data from the response
                const user = userResponse.data;
console.log(user)
                // Set user data
                setUserData(user);
            } catch (error) {
                setError('Error fetching user data');
                console.error(error); // Log the error for debugging
            }
        };

        fetchUserData();
    }, []);

    return (
        <Wrapper>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h1>About Me</h1>
                            </div>
                            <div className="card-body">
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                {userData ? (
                                    <div className='user-details'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>ID:</strong> {userData.singleuser.id}</p>
                                                <p><strong>First Name:</strong> {userData.singleuser.firstname || 'N/A'}</p>
                                                <p><strong>Middle Name:</strong> {userData.singleuser.middlename || 'N/A'}</p>
                                                <p><strong>Last Name:</strong> {userData.singleuser.lastname || 'N/A'}</p>
                                                <p><strong>Gender:</strong> {userData.singleuser.gender || 'N/A'}</p>
                                                <p><strong>Date of Birth:</strong> {userData.singleuser.dateofbirth || 'N/A'}</p>
                                                <p><strong>Email:</strong> {userData.singleuser.email}</p>
                                                <p><strong>Mobile No:</strong> {userData.singleuser.mobileno || 'N/A'}</p>
                                                <p><strong>Worker Type:</strong> {userData.singleuser.workertype || 'N/A'}</p>
                                                <p><strong>Time Type:</strong> {userData.singleuser.timetype || 'N/A'}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Joining Date:</strong> {userData.singleuser.joiningdate || 'N/A'}</p>
                                                <p><strong>Job Title:</strong> {userData.singleuser.jobtitle || 'N/A'}</p>
                                                <p><strong>Reporting Manager:</strong> {userData.singleuser.reportingmanager || 'N/A'}</p>
                                                <p><strong>Department:</strong> {userData.singleuser.department || 'N/A'}</p>
                                                <p><strong>Location:</strong> {userData.singleuser.location || 'N/A'}</p>
                                                <p><strong>Notice Period:</strong> {userData.singleuser.noticeperiod || 'N/A'}</p>
                                                <p><strong>Role:</strong> {userData.singleuser.role}</p>
                                                <p><strong>Employee Number:</strong> {userData.singleuser.empNumber || 'N/A'}</p>
                                                <p><strong>Status:</strong> {userData.singleuser.status || 'N/A'}</p>
                                                {/* <p><strong>Education:</strong> {userData.singleuser.education || 'N/A'}</p> */}
                                                <p><strong>Account Number:</strong> {userData.singleuser.bank.bankAccountNumber || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div>
                            <ProfileUpdate />
                            {/* < StyledLink to='/emp/education-form'>
                                <StyledButton>
                                    <h5>Add Education Details</h5>
                                </StyledButton>
                            </StyledLink> */}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
.col-md-7{
    width:45rem;
    margin-left:12rem;
}
.col-md-5{
    width:15rem;
    margin:0px
}
  .card {
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }

  .card-header h1 {
    margin: 0;
    color: #333;
    font-size: 24px;
  }

  .card-body {
    padding: 20px;
  }

  .user-details {
    margin-top: 20px;
  }

  .user-details p {
    margin: 5px 0;
    padding: 10px;
    background: #f1f1f1;
    border-radius: 5px;
    font-size: 14px;
  }

  .user-details p strong {
    color: #555;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledButton = styled.button`
    background-color: #2e202b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    &:focus {
        outline: none;
    }

    h5 {
        margin: 0;
        text-decoration: none;
        font-size: 20px;
    }
`;

export default MyProfile;
