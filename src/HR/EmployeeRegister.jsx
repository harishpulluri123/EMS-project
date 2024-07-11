import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../utils/JWT_Token';


const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    email: '',
    mobileno: '',
    workertype: '',
    timetype: '',
    joiningdate: '',
    jobtitle: '',
    reportingmanager: '',
    department: '',
    location: '',
    noticeperiod: '',
    password: '',
    empNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    console.log('Token:', token);  // Log the token for debugging

    try {
      const response = await axios.post('http://localhost:2022/api/user/registeremp', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      alert('Registration successful!');
    } catch (error) {
      if (error.response) {
        console.error('Server Response Error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No Response Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <Wrapper>
      <h1>Employee Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mobile No</label>
            <input type="text" name="mobileno" value={formData.mobileno} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Worker Type</label>
            <input type="text" name="workertype" value={formData.workertype} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Time Type</label>
            <input type="text" name="timetype" value={formData.timetype} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Joining Date</label>
            <input type="date" name="joiningdate" value={formData.joiningdate} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="jobtitle" value={formData.jobtitle} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Reporting Manager</label>
            <input type="text" name="reportingmanager" value={formData.reportingmanager} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Notice Period</label>
            <input type="text" name="noticeperiod" value={formData.noticeperiod} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Employee Number</label>
            <input type="text" name="empNumber" value={formData.empNumber} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 10px;

    label {
      margin-bottom: 5px;
    }

    input, select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default EmployeeRegister;
