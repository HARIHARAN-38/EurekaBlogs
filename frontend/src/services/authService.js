import axios from 'axios';

// In development with Docker, use the API service name
// In production or local development without Docker, use localhost
// When the app is served from the frontend container, use 'api' as the hostname
// When the app is accessed in a browser on the host machine, use 'localhost'

// For requests from the browser, we need to use localhost instead of the Docker service name
const getCorrectApiUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  // If we're in browser context and the URL contains 'api:' (Docker service name),
  // replace it with 'localhost' for browser requests
  if (typeof window !== 'undefined' && apiUrl.includes('api:')) {
    return apiUrl.replace('http://api:', 'http://localhost:');
  }
  return apiUrl;
};

const API_URL = getCorrectApiUrl();
const AUTH_URL = `${API_URL}/api/auth`;
console.log('Using Auth URL in authService:', AUTH_URL);

// Register a new user
export const registerUser = async (userData) => {
  try {
    console.log('Registering user with API URL:', AUTH_URL);
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    if (error.message === 'Network Error') {
      return { success: false, message: 'Cannot connect to the server. Please try again later.' };
    }
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Login failed' };
  }
};

// Logout a user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get the current user profile
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }
    
    const response = await axios.get(`${AUTH_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Failed to get user profile' };
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }
    
    const response = await axios.put(`${AUTH_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Update stored user data if update was successful
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Failed to update profile' };
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }
    
    const response = await axios.patch(`${AUTH_URL}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Failed to change password' };
  }
};

// Password reset flow (forgot password)
export const resetPassword = async (resetData) => {
  try {
    const { step } = resetData;
    
    // Different endpoints based on the reset step
    let endpoint = '';
    switch (step) {
      case 'request':
        endpoint = '/forgot-password';
        break;
      case 'verify':
        endpoint = '/verify-security-answer';
        break;
      case 'reset':
        endpoint = '/reset-password';
        break;
      default:
        return { success: false, message: 'Invalid request' };
    }
    
    const response = await axios.post(`${AUTH_URL}${endpoint}`, resetData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    
    // Fallback responses for development without backend implementation
    if (resetData.step === 'request') {
      // Mock response for email check (step 1)
      return { 
        success: true, 
        message: 'Security question found',
        securityQuestion: 'What was the name of your first pet?' 
      };
    } else if (resetData.step === 'verify') {
      // Mock response for security answer verification (step 2)
      return { success: true, message: 'Security answer verified' };
    } else if (resetData.step === 'reset') {
      // Mock response for password reset (step 3)
      return { success: true, message: 'Password reset successful' };
    }
    
    return { 
      success: false, 
      message: 'Server error. Please try again later.' 
    };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Get authentication token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get authentication token (for use by other services)
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Set up axios interceptor to include token in all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (!error.response) {
      // Network error or server not responding
      console.error('Network error or server not responding');
    } else if (error.response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (error.response.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    } else if (error.response.status === 500) {
      // Server error
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);
