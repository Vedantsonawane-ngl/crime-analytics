import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getCurrentUser();
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser || { email: 'officer@gov.in', name: 'Duty Officer' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const receivedToken = await authService.login(credentials);
    if (receivedToken) {
      setToken(receivedToken);
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
    return receivedToken;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token || authService.isAuthenticated();

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
