import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import CategoryCard from '../components/CategoryCard';
import { getBlogPosts } from '../services/blogService';
import '../styles/HomePage.css';
import heroImage from '../images/hero-bg.jpg'; // Import the image

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply the imported image to the hero section
  useEffect(() => {
    document.documentElement.style.setProperty('--hero-bg-image', `url(${heroImage})`);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogPosts();
        
        // Set featured blogs (first 3)
        setFeaturedBlogs(response.data.slice(0, 3));
        
        // Set recent blogs (latest 6)
        setRecentBlogs(response.data.slice(0, 6));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = [
    { id: 1, name: 'Technology', icon: '💻', count: 12 },
    { id: 2, name: 'Science', icon: '🔬', count: 8 },
    { id: 3, name: 'Philosophy', icon: '🧠', count: 5 },
    { id: 4, name: 'Art', icon: '🎨', count: 7 },
    { id: 5, name: 'History', icon: '📜', count: 6 }
  ];

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Eureka Blogs</h1>
            <p className="hero-subtitle">Where Ideas Come to Life</p>
            <p className="hero-description">
              Explore thought-provoking articles on science, technology, philosophy, and more. Join our community of curious minds.
            </p>
            <div className="hero-buttons">
              <Link to="/blogs" className="btn btn-primary">Explore Articles</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Articles</h2>
          {featuredBlogs.length > 0 ? (
            <div className="featured-blogs">
              {featuredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} featured />
              ))}
            </div>
          ) : (
            <div className="no-blogs-message">
              No featured articles available at the moment.
            </div>
          )}
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="recent-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Posts</h2>
            <Link to="/blogs" className="view-all-link">
              View All <span>→</span>
            </Link>
          </div>
          {recentBlogs.length > 0 ? (
            <div className="blog-grid">
              {recentBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="no-blogs-message">
              No recent articles available at the moment.
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Subscribe to our newsletter for weekly updates on the latest articles, events, and exclusive content.</p>
            <Link to="/subscribe" className="btn btn-light">Subscribe Now</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
