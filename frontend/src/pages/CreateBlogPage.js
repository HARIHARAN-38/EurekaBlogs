import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import blogService from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import '../styles/BlogEditor.css';

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    coverImage: '',
    status: 'published'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to create a blog post');
      navigate('/login', { state: { from: '/create-blog' } });
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }
    
    // Convert tags from comma-separated string to array
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    try {
      setIsLoading(true);
      setError('');
      
      // Make actual API call to create blog
      const response = await blogService.createBlog(blogData);
      
      if (response && response.success) {
        toast.success('Blog post created successfully!');
        navigate(`/blog/${response.blog.slug}`);
      } else {
        // If API returns error
        setError(response?.message || 'Failed to create blog post');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      setError('An error occurred while creating the blog post');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container">
      <div className="blog-editor">
        <h1>Create New Article</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter a descriptive title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="form-control"
              placeholder="A short summary of your article (shown in previews)"
              rows="2"
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="philosophy">Philosophy</option>
                <option value="art">Art</option>
                <option value="history">History</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group form-group-half">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter tags separated by commas (e.g., react, web development, tutorials)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="form-control"
              placeholder="https://example.com/your-image.jpg"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content (Markdown supported)</label>
            <div className="editor-help">
              <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">
                Markdown Cheatsheet
              </a>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-control content-editor"
              placeholder="Write your article content here..."
              rows="15"
              required
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
