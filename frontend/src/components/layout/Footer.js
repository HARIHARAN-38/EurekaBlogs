import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../../styles/Footer.css';
import logoImage from '../../images/eureka-logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-about">
            <div className="footer-logo">
              <img src={logoImage} alt="Eureka Blogs Logo" />
            </div>
            <p className="footer-description">
              A platform where innovative ideas and knowledge come to life through thoughtful, engaging content.
              Our mission is to inspire, educate, and connect through the power of well-crafted blogs.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/register" className="footer-link">Register</Link>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Categories</h4>
            <div className="footer-links">
              <Link to="/category/science" className="footer-link">Science</Link>
              <Link to="/category/technology" className="footer-link">Technology</Link>
              <Link to="/category/philosophy" className="footer-link">Philosophy</Link>
              <Link to="/category/art" className="footer-link">Art</Link>
              <Link to="/category/education" className="footer-link">Education</Link>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-heading">Subscribe</h4>
            <div className="footer-subscribe">
              <p>Get the latest posts delivered right to your inbox</p>
              <div className="subscribe-form">
                <input type="email" placeholder="Your email address" className="subscribe-input" />
                <button className="subscribe-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Eureka Blogs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
