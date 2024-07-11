import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { getToken, clearToken } from '../../utils/JWT_Token';
import { useAuth } from '../../Context/AuthContext'; // Adjust the path as per your project structure

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [profileMenu, setProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        const response = await axios.get('your api', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Assuming response.data contains user details
        setUserData(response.data); // Set user data in state
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();

    // Clear session storage on window reload
    const handleBeforeUnload = () => {
      sessionStorage.clear();
      navigate('/login'); // Redirect to login page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Clear token and user data
    sessionStorage.clear(); // Clear session storage data
    navigate('/login');
    window.location.reload(); // Navigate to login page
  };

  const toggleProfileMenu = () => setProfileMenu(!profileMenu);

  // Retrieve profile name from session storage
  const profileName = sessionStorage.getItem('firstname') || '';

  return (
    <Wrapper>
      <div className='profile-menu' onClick={toggleProfileMenu}>
        <span className='profile-name'>{profileName}</span>
        {user && user.profilePic ? (
          <img src={user.profilePic} alt='Profile' className='profile-pic' />
        ) : (
          <FaUserCircle className='profile-icon' />
        )}
        {profileMenu && (
          <ul className='profile-submenu'>
            <li className='profile-subtext'>
              <Link to='/user/profile'>Profile</Link>
            </li>
            {user.role === 'Admin' && (
              <li className='profile-subtext'>
                <Link to='/admin/ch-password'>Change Password</Link>
              </li>
            )}
            <li className='profile-subtext' onClick={handleLogout}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .profile-menu {
    display: inline-block;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .profile-icon {
    font-size: 40px;
    margin-right: 10px;
  }

  .profile-name {
    color: #eee3e3;
    font-size: 16px;
    margin-right: 10px;
  }

  .profile-submenu {
    background-color: #0c1a2a;
    position: absolute;
    top: 40px; /* Adjust the top value as needed */
    right: 0;
    width: 200px;
    flex-direction: column;
    padding: 10px 0;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .profile-subtext {
    padding: 10px 20px;
    list-style: none;
    color: white;
  }

  .profile-subtext a {
    color: #f4eaea;
    text-decoration: none;
    display: block;
  }

  .profile-subtext a:hover, .profile-subtext:hover {
    background-color: #3075c4;
    border-radius: 4px;
  }
`;

export default ProfileMenu;
