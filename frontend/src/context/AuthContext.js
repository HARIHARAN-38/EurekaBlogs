import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Get the API URL from environment variables
// In Docker environment, use the service name (api)
// In development environment on host machine, use localhost
const isDocker = process.env.REACT_APP_IS_DOCKER === 'true';
const API_URL = process.env.REACT_APP_API_URL || (isDocker ? 'http://api:5000' : 'http://localhost:5000');
console.log('Using API URL:', API_URL);

// For development inside Docker, we want to use the service name
// For browser requests originating from the host machine, we need to use localhost
// This fixes the axios calls within the browser that can't resolve 'api' hostname
const getApiUrl = (endpoint) => {
  // If running in browser (not server-side), replace 'api' with 'localhost' in URL
  if (typeof window !== 'undefined' && API_URL.includes('api:')) {
    return `http://localhost:5000${endpoint}`;
  }
  return `${API_URL}${endpoint}`;
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default header with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(getApiUrl('/api/auth/profile'));
        
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setToken(null);
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setToken(null);
        localStorage.removeItem('token');
        setError('Authentication failed. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      // Make sure we're using the correct API URL for registration
      const apiUrl = `http://localhost:5000/api/auth/register`;
      console.log('Registering user with direct API URL:', apiUrl);
      
      // Include security question and answer in registration
      const registrationData = {
        ...userData,
        // Make sure security question and answer are included
        securityQuestion: userData.securityQuestion || 'What is your favorite color?',
        securityAnswer: userData.securityAnswer || ''
      };
      
      console.log('User data being sent:', JSON.stringify({
        ...registrationData,
        password: '********', // Don't log actual password
        securityAnswer: '********' // Don't log actual security answer
      }));
      
      const res = await axios.post(apiUrl, registrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration response:', res.data);
      
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      } else {
        setError(res.data.message || 'Registration failed with unknown error.');
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      // Log detailed error information
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
        
        // Use the server's error message if available
        const serverMessage = err.response.data?.message || 'Server error during registration.';
        setError(serverMessage);
        return { success: false, message: serverMessage };
      } else if (err.request) {
        console.error('No response received, request was:', err.request);
        setError('No response from server. Please check your internet connection.');
        return { success: false, message: 'No response from server. Please check your internet connection.' };
      } else {
        console.error('Error setting up request:', err.message);
        setError('Failed to connect to server. Please try again later.');
        return { success: false, message: 'Failed to connect to server. Please try again later.' };
      }
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post(getApiUrl('/api/auth/login'), { email, password });
      
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      return { success: false, message };
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put(getApiUrl('/api/auth/profile'), profileData);
      
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error('Profile update error:', err);
      const message = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const res = await axios.patch(getApiUrl('/api/auth/change-password'), passwordData);
      
      if (res.data.success) {
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error('Password change error:', err);
      const message = err.response?.data?.message || 'Failed to change password. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        token,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        clearError,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
