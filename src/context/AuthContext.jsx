// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Check for existing token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const storedUser = {
        email: localStorage.getItem('userEmail'),
        isAdmin: localStorage.getItem('isAdmin') === 'true'
      };
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // Mock API call - in a real app, this would be an actual API call
      let response;
      if (email === 'nasirnaeem66@gmail.com' && password === '123456') {
        response = { 
          token: 'mock-admin-token', 
          user: { 
            email,
            isAdmin: true
          } 
        };
      } else {
        response = { 
          token: 'mock-token', 
          user: { 
            email,
            isAdmin: false
          } 
        };
      }
      
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAdmin', response.user.isAdmin);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Invalid credentials' 
      };
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      // Mock API call - replace with actual API call
      // const response = await yourApi.register(name, email, password);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!token;
  }, [token]);

  const isAdmin = useCallback(() => {
    return user?.isAdmin || false;
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      logout,
      isAuthenticated,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};