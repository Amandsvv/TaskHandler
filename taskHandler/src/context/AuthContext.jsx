import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/auth/check-auth`, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      setUser(res.data.data);
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const skipPaths = ['/', '/login', '/signup'];
    if (!skipPaths.includes(location.pathname)) {
      checkAuth(); // Run only if not on login/signup/home
    }
  }, [location.pathname, baseUrl]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
