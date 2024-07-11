import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';

const GetIP = () => {
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIpData = async () => {
      const token = getToken();
      try {
        const response = await axios.get('http://localhost:2022/location/ip', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setIpData(response.data);
      } catch (err) {
        console.error('Error fetching IP data:', err);
        setError('Failed to fetch IP data.');
      }
    };

    fetchIpData();
  }, []);

  return (
    <div>
      <h1>IP Information</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ipData ? (
        <div>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>City:</strong> {ipData.city}</p>
          <p><strong>Region:</strong> {ipData.region}</p>
          <p><strong>Country:</strong> {ipData.country}</p>
          <p><strong>Location:</strong> {ipData.loc}</p>
          <p><strong>Organization:</strong> {ipData.org}</p>
          <p><strong>Postal Code:</strong> {ipData.postal}</p>
          <p><strong>Timezone:</strong> {ipData.timezone}</p>
        </div>
      ) : (
        <p>Loading IP information...</p>
      )}
    </div>
  );
};

export default GetIP;
