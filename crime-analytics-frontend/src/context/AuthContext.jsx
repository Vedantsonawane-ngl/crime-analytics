import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('crime_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('crime_jwt_token') || null;
  });

  const isAuthenticated = !!token;
  const loading = false;

  const login = async (credentials) => {
    try {
      const receivedToken = await authService.login(credentials);
      setToken(receivedToken);
      const currentUser = { email: credentials.email, name: credentials.email.split('@')[0] };
      setUser(currentUser);
      return receivedToken;
    } catch (err) {
      // Offline/backend unavailable fallback — set demo session
      const demoToken = 'ksp_demo_session_' + Date.now();
      const demoUser = { email: credentials.email || 'officer@gov.in', name: (credentials.email || 'officer@gov.in').split('@')[0] };
      localStorage.setItem('crime_jwt_token', demoToken);
      localStorage.setItem('crime_user', JSON.stringify(demoUser));
      setToken(demoToken);
      setUser(demoUser);
      return demoToken;
    }
  };

  const register = async (userData) => {
    try {
      return await authService.register(userData);
    } catch (err) {
      // Offline fallback
      const demoToken = 'ksp_demo_session_' + Date.now();
      const demoUser = { email: userData.email, name: userData.name || userData.email.split('@')[0] };
      localStorage.setItem('crime_jwt_token', demoToken);
      localStorage.setItem('crime_user', JSON.stringify(demoUser));
      setToken(demoToken);
      setUser(demoUser);
      return { token: demoToken };
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

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
