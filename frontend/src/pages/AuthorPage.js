import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import blogService from '../services/blogService';
import defaultAvatarImage from '../images/default-avatar.jpg';

const AuthorPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogsByAuthor(authorId);
        
        if (response.success) {
          setBlogs(response.blogs);
          // Assuming the author details are included with the blog posts
          if (response.blogs.length > 0) {
            setAuthor(response.blogs[0].author);
          }
        } else {
          setError(response.message || 'Failed to fetch author blogs');
        }
      } catch (err) {
        console.error('Error fetching author blogs:', err);
        setError('Error loading author information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorBlogs();
  }, [authorId]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading author profile...</p>
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

  if (!author) {
    return (
      <div className="container">
        <div className="not-found-container">
          <h2>Author Not Found</h2>
          <p>We couldn't find the author you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="author-page">
        <div className="author-profile">
          <div className="author-header">
            <div className="author-avatar">
              <img 
                src={author.profilePicture || defaultAvatarImage} 
                alt={author.username}
                onError={(e) => { e.target.src = defaultAvatarImage; }}
              />
            </div>
            <div className="author-info">
              <h1>{author.username}</h1>
              <p className="author-bio">{author.bio || `${author.username} is a contributor at Eureka Blogs.`}</p>
              <div className="author-stats">
                <div className="stat">
                  <span className="stat-number">{blogs.length}</span>
                  <span className="stat-label">Articles</span>
                </div>
                {/* Additional stats could go here */}
              </div>
            </div>
          </div>
        </div>

        <div className="author-blogs">
          <h2>Articles by {author.username}</h2>
          
          {blogs.length > 0 ? (
            <div className="blog-grid">
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="no-blogs-message">
              This author hasn't published any articles yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
