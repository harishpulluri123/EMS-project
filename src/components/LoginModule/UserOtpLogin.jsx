// UserOtpLogin.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Context/AuthContext';
import { saveToken } from '../../utils/JWT_Token';

const UserOtpLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:2022/api/user/send-otp', { email });
      setIsEmailSent(true);
      setError(null);
    } catch (error) {
      setError('Error sending OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:2022/api/user/login', { emailId: email, otp });
     
      const {  user } = response.data;
      const token =(response.data.jwtToken)
      saveToken(token);
     
      login({ token, ...user });
      navigate('/');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
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
              <div className='card-body'>
              <Link to="/login">Login With password</Link> 
                {!isEmailSent ? (
                  <>
                    <div className="form-group">
                      <input className="form-control form-control-lg"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                       
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={handleSendOTP}>
                      {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <input className="form-control form-control-lg"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                      />
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={handleVerifyOTP}>
                      {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verify OTP'}
                    </button>
                  </>
                )}
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

  .btn {
    width: 100%;
  }
`;

export default UserOtpLogin;
