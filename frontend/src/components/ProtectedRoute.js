import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="container">
        <div className="loading">Checking authentication...</div>
      </div>
    );
  }
  
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If a specific role is required and user doesn't have it, redirect to home
  if (requiredRole && (!user.role || user.role !== requiredRole)) {
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and has required role (if specified)
  return children;
};

export default ProtectedRoute;
