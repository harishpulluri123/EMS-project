// src/Service/empService.js
import axios from 'axios';
import config from './Config';

const API_URL = config.apiUrl;

const Services = async (endpoint, token) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default Services;
