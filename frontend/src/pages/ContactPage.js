import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    toast.success('Message sent! We will get back to you soon.');
    navigate('/');
  };
  
  return (
    <div className="container">
      <div className="contact-page">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Please fill out the form below with any questions, 
          feedback, or concerns you might have.
        </p>
        
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                placeholder="Subject"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="form-control"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
          
          <div className="contact-info">
            <h3>Other Ways to Reach Us</h3>
            
            <div className="contact-method">
              <h4>Email</h4>
              <p>info@eureka-blogs.com</p>
            </div>
            
            <div className="contact-method">
              <h4>Follow Us</h4>
              <div className="social-links">
                {/* Social media links would go here */}
                <a href="#twitter" className="social-link">Twitter</a>
                <a href="#facebook" className="social-link">Facebook</a>
                <a href="#instagram" className="social-link">Instagram</a>
              </div>
            </div>
            
            <div className="contact-method">
              <h4>Office Hours</h4>
              <p>Monday - Friday: 9am - 5pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
