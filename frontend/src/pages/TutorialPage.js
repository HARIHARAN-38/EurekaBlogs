import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEdit, FaUser, FaBookReader, FaLightbulb } from 'react-icons/fa';
import '../styles/TutorialPage.css';

const TutorialPage = () => {
  return (
    <div className="tutorial-page">
      <div className="container">
        <div className="tutorial-header">
          <h1>Getting Started with Eureka Blogs</h1>
          <p>Follow this step-by-step guide to start sharing your ideas with our community</p>
        </div>
        
        <div className="tutorial-steps">
          <div className="tutorial-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">
                <FaUser />
              </div>
              <h2>Create Your Account</h2>
              <p>
                Sign up for a free account to get started. You'll need to provide a valid email address, 
                username, and secure password. Once registered, you'll have access to all features of 
                Eureka Blogs.
              </p>
              <div className="step-action">
                <Link to="/register" className="btn btn-primary">
                  Create Account <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="tutorial-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">
                <FaEdit />
              </div>
              <h2>Create Your First Blog</h2>
              <p>
                After logging in, click on "Create Now" in the navigation menu or homepage. 
                You'll be directed to our easy-to-use editor where you can write and format your 
                blog post. Add images, headings, lists, and more to make your content engaging.
              </p>
              <div className="step-action">
                <Link to="/create-blog" className="btn btn-primary">
                  Start Writing <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="tutorial-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">
                <FaLightbulb />
              </div>
              <h2>Choose a Topic</h2>
              <p>
                Select a category for your blog from our main topics: Science, Technology, 
                Philosophy, Art, or Education. Adding the right category helps readers find 
                your content and connects you with an interested audience.
              </p>
              <ul className="topic-list">
                <li><Link to="/category/science">Science</Link></li>
                <li><Link to="/category/technology">Technology</Link></li>
                <li><Link to="/category/philosophy">Philosophy</Link></li>
                <li><Link to="/category/art">Art</Link></li>
                <li><Link to="/category/education">Education</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="tutorial-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <div className="step-icon">
                <FaBookReader />
              </div>
              <h2>Engage with the Community</h2>
              <p>
                Read and comment on other blogs, follow authors whose work you enjoy, and build 
                your network. Engagement helps grow your audience and improves the visibility of 
                your content.
              </p>
              <div className="step-action">
                <Link to="/" className="btn btn-primary">
                  Explore Blogs <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tutorial-cta">
          <h2>Ready to get started?</h2>
          <p>Join our community of writers and share your unique perspective with the world.</p>
          <Link to="/create-blog" className="btn btn-large">
            Create Your First Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
