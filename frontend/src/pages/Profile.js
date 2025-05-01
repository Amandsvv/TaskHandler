// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/api/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch user info");
      });
  }, [baseUrl]);

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Profile</h2>
      <div className="card shadow p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more fields like phone, role, etc. if available */}
      </div>
    </div>
  );
}

export default Profile;
