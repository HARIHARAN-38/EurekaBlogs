import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { updateProfile, changePassword } from '../services/authService';
import blogService from '../services/blogService';
import BlogCard from '../components/blog/BlogCard';
import defaultAvatarImage from '../images/default-avatar.jpg';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile: updateAuthUser } = useAuth();
  
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [userBlogs, setUserBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileUpdated, setProfileUpdated] = useState(false);
  
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (user && user.id) {
          const response = await blogService.getBlogsByAuthor(user.id);
          if (response.success) {
            setUserBlogs(response.blogs);
          }
        }
      } catch (err) {
        console.error('Error fetching user blogs:', err);
      }
    };
    
    fetchUserBlogs();
  }, [user]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      const result = await updateProfile(profileData);
      
      if (result.success) {
        await updateAuthUser(profileData);
        toast.success('Profile updated successfully!');
        setProfileUpdated(true);
        setTimeout(() => setProfileUpdated(false), 3000);
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError('An error occurred while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (result.success) {
        toast.success('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setError('An error occurred while changing your password');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="container">
        <div className="not-authenticated">
          <h2>Not Authenticated</h2>
          <p>You need to be logged in to access your profile.</p>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="profile-page">
        {/* Banner header */}
        <div className="profile-banner">
          <div className="banner-overlay" />
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src={user.profilePicture || defaultAvatarImage} 
                alt={user.username}
                onError={(e) => { e.target.src = defaultAvatarImage; }}
              />
            </div>
            <div className="profile-info">
              <h1>{user.username}</h1>
              <p className="user-role">{user.role}</p>
              <div className="user-stats">
                <div className="stat" title="Total articles you've published">
                  <span className="stat-number">{userBlogs.length}</span>
                  <span className="stat-label">Articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs with wrap to prevent overlap */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button 
            className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            Your Articles
          </button>
        </div>
        
        <div className="profile-content">
          {error && <div className="error-message">{error}</div>}
          
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Edit Profile</h2>
              {profileUpdated && (
                <div className="success-message">
                  Profile updated successfully!
                </div>
              )}
              <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio || ''}
                    onChange={handleProfileChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture URL</label>
                  <input
                    type="url"
                    id="profilePicture"
                    name="profilePicture"
                    value={profileData.profilePicture || ''}
                    onChange={handleProfileChange}
                    className="form-control"
                    placeholder="https://example.com/your-image.jpg"
                  />
                </div>
                
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="security-section">
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'articles' && (
            <div className="articles-section">
              <div className="articles-header">
                <h2>Your Articles</h2>
                <Link to="/create-blog" className="btn btn-primary">
                  Create New Article
                </Link>
              </div>
              
              {userBlogs.length > 0 ? (
                <div className="blog-grid">
                  {userBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="no-blogs-message">
                  You haven't published any articles yet. Ready to share your knowledge?
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
