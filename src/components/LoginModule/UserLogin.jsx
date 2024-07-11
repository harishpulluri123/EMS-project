import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../utils/JWT_Token';
import styled from 'styled-components';
 import { useAuth } from '../../Context/AuthContext';
 import 'bootstrap/dist/css/bootstrap.min.css';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:2022/api/user/login', {
        emailId: email,
        password: password,
      });
      const data = response.data;
      console.log(data);
      if (data && data.jwtToken) {
        saveToken(data.jwtToken);
        console.log('Token saved:', data.jwtToken);
        setError(null);

        // Save user info to session storage
        sessionStorage.setItem('email', data.user.email);
        sessionStorage.setItem('empNumber', data.user.empNumber);
        sessionStorage.setItem('Id', data.user.id);
        sessionStorage.setItem('firstname', data.user.firstname);

        login(data.user); // Update auth context with user data
        navigate('/'); // Redirect to the home page after login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error('Error during login:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-5">
            <StyledCard>
              <div className="card-body">
               
                <Link to="/login/otp"> Login With OTP</Link>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                </div>
                <a href="!#" className="forgot-password">Forgot password?</a>
                <button className="btn btn-primary btn-lg" onClick={handleLogin}>Sign in</button>
              </div>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </StyledCard>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .col-md-7 {
    margin-top: 70px;
    margin-left: -80px;
  }
  .col-md-5 {
    margin-top: 80px; 
    margin-left: 60px;
  }
`;

const StyledCard = styled.div`
  border: 1px solid #ced4da;
  border-radius: 1.25rem;
  box-shadow: 0 0.7rem 1rem rgba(0, 0, 0, 0.15);

  .card-body {
    padding: 80px 45px 80px 45px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-check {
    margin-bottom: 1.5rem;
  }

  .forgot-password {
    display: block;
    margin-bottom: 1.5rem;
  }

  .btn {
    width: 100%;
  }
`;

export default UserLogin;
