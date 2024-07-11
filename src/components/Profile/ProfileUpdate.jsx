import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../../utils/JWT_Token'; // Import function to get the token

function ProfileUpdate() {
  const [mobileno, setMobileno] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        const userResponse = await axios.get('http://localhost:2022/api/user/currentuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = userResponse.data.singleuser;
        console.log(user)
        // setMobileno(user.mobileno);
        // setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        setError('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = getToken();
      await axios.put('http://localhost:2022/api/user/adminUpdateDetails', {
        mobileno,
        name,
        email,
        role
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setSuccess('Profile updated successfully!');
      setError(null);
    } catch (error) {
      setError('Error updating profile. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <Wrapper>
      <div className="card profile-update">
        <div className="card-header">
          <h1>Profile Update</h1>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="mobileno">Mobile No:</label>
            <input
              type="text"
              className="form-control"
              id="mobileno"
              value={mobileno}
              onChange={(e) => setMobileno(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
               onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              readOnly // Make the input read-only if you don't want to allow role updates
            />
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleUpdateProfile}>
            Update Profile
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
 .profile-update{
  width:400px;
 }
  .card {
    padding: 20px;
  }
  .card-header {
    margin-bottom: 20px;
  }
  .card-footer {
    margin-top: 20px;
  }
`;

export default ProfileUpdate;
