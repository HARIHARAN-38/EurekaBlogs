import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Security questions list
  const securityQuestions = [
    'What was the name of your first pet?',
    'What was your childhood nickname?',
    'In what city were you born?',
    'What is your mother\'s maiden name?',
    'What high school did you attend?',
    'What was the make of your first car?',
    'What is your favorite movie?',
    'What is your favorite book?'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration form submitted');
    
    // Form validation
    if (!formData.username || !formData.email || !formData.password || 
        !formData.securityQuestion || !formData.securityAnswer) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.securityAnswer.length < 2) {
      setError('Security answer must be at least 2 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      console.log('Submitting registration data:', {
        username: formData.username,
        email: formData.email,
        password: '********' // Don't log actual password
      });
      
      // Create a clean object with just the required fields
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer
      };
      
      const result = await register(registrationData);
      console.log('Registration result:', result);
      
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        console.error('Registration failed with message:', result.message);
        setError(result.message || 'Registration failed');
        toast.error(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <h2>Create an Account</h2>
          <p className="auth-description">
            Join our community and start sharing your ideas with the world.
          </p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Choose a username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="securityQuestion">Security Question</label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select a security question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="securityAnswer">Security Answer</label>
              <input
                type="text"
                id="securityAnswer"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your answer"
                required
              />
              <p className="field-note">
                This will be used to recover your password if you forget it
              </p>
            </div>
            
            <button
              type="submit"
              className={`btn btn-primary btn-block ${isLoading ? 'btn-disabled' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          {/* Social registration options could be added here */}
          
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>
          
          <p className="terms">
            By registering, you agree to our{' '}
            <Link to="/terms" className="auth-link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="auth-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
