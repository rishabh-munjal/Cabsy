import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectionWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // To prevent premature render

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login if token is invalid
      });
    } else {
      navigate("/login"); // Redirect if no token
    }
  }, []);

  if (loading) return <div>Loading...</div>; // Optional: add spinner

  return <>{children}</>;
};

export default UserProtectionWrapper;
