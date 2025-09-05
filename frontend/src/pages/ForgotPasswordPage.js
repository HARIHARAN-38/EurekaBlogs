import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../services/authService';
import '../styles/AuthPages.css';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [securityQuestionFromServer, setSecurityQuestionFromServer] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Call the API to check if email exists and get security question
      const result = await resetPassword({
        email: formData.email,
        step: 'request'
      });
      
      if (result.success) {
        setSecurityQuestionFromServer(result.securityQuestion);
        setStep(2);
        toast.info('Please answer your security question');
      } else {
        setError(result.message || 'Email not found');
      }
    } catch (err) {
      console.error('Error checking email:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSecurityAnswerSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.securityAnswer) {
      setError('Please answer the security question');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Call the API to verify security answer
      const result = await resetPassword({
        email: formData.email,
        securityAnswer: formData.securityAnswer,
        step: 'verify'
      });
      
      if (result.success) {
        setStep(3);
        toast.info('You can now set a new password');
      } else {
        setError(result.message || 'Incorrect security answer');
      }
    } catch (err) {
      console.error('Error verifying security answer:', err);
      setError('Failed to verify your answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Call the API to reset the password
      const result = await resetPassword({
        email: formData.email,
        securityAnswer: formData.securityAnswer,
        newPassword: formData.newPassword,
        step: 'reset'
      });
      
      if (result.success) {
        setStep(4);
        toast.success('Password reset successful!');
      } else {
        setError(result.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Failed to reset your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <h2>Forgot Password</h2>
          <p className="auth-description">
            {step === 1 && 'Enter your email to start the password recovery process.'}
            {step === 2 && 'Answer your security question to verify your identity.'}
            {step === 3 && 'Create a new password for your account.'}
            {step === 4 && 'Your password has been reset successfully!'}
          </p>
          
          {error && <div className="auth-error">{error}</div>}
          
          {step === 1 && (
            <form className="auth-form" onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary btn-block ${isLoading ? 'btn-disabled' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Next'}
              </button>
            </form>
          )}
          
          {step === 2 && (
            <form className="auth-form" onSubmit={handleSecurityAnswerSubmit}>
              <div className="form-group">
                <label>Security Question:</label>
                <p className="security-question">{securityQuestionFromServer}</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="securityAnswer">Your Answer</label>
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
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </form>
          )}
          
          {step === 3 && (
            <form className="auth-form" onSubmit={handlePasswordReset}>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(2)}
                  disabled={isLoading}
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
          
          {step === 4 && (
            <div className="auth-success">
              <p>Your password has been reset successfully.</p>
              <Link to="/login" className="btn btn-primary btn-block">
                Log In with New Password
              </Link>
            </div>
          )}
          
          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
