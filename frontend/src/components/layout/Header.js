import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Header.css';
import logoImage from '../../images/eureka-logo.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Eureka Blogs Logo" />
        </Link>

        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/philosophy">Philosophy</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {user ? (
          <div className="user-menu" onClick={toggleUserMenu}>
            <div className="user-avatar">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.username} />
              ) : (
                <FaUser />
              )}
            </div>
            <div className={`user-dropdown ${userMenuOpen ? 'active' : ''}`}>
              <div className="dropdown-item">
                <Link to="/profile">Profile</Link>
              </div>
              <div className="dropdown-item">
                <Link to="/create-blog">Create Blog</Link>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </div>
        )}

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/category/science" onClick={() => setMobileMenuOpen(false)}>
              Science
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/category/technology" onClick={() => setMobileMenuOpen(false)}>
              Technology
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/category/philosophy" onClick={() => setMobileMenuOpen(false)}>
              Philosophy
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
