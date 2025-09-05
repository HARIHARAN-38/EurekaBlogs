import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import blogService from '../services/blogService';
import '../styles/BlogEditor.css';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    coverImage: '',
    tags: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getBlogById(id);
        const blogData = response.blog || response; // Handle different API response structures
        
        console.log('Fetched blog data:', blogData);
        
        if (!user) {
          setError('Please log in to edit this blog');
          navigate('/login');
          return;
        }
        
        // Check if user is authorized to edit this blog
        if (blogData.author && blogData.author.id !== user.id && user.role !== 'admin') {
          setError('You are not authorized to edit this blog');
          navigate('/blog/' + id);
          return;
        }
        
        // Extract excerpt as summary if summary doesn't exist
        const summary = blogData.summary || blogData.excerpt || '';
        
        setFormData({
          title: blogData.title || '',
          summary: summary,
          content: blogData.content || '',
          category: (blogData.category && blogData.category._id) || blogData.category || 'general',
          coverImage: blogData.coverImage || '',
          tags: blogData.tags ? blogData.tags.join(', ') : ''
        });
        
        try {
          // Fetch categories
          const categoriesData = await blogService.getCategories();
          setCategories(categoriesData);
        } catch (categoryErr) {
          console.error('Error fetching categories:', categoryErr);
          // Use default categories if API call fails
          setCategories([
            { _id: 'technology', name: 'Technology' },
            { _id: 'science', name: 'Science' },
            { _id: 'philosophy', name: 'Philosophy' },
            { _id: 'general', name: 'General' }
          ]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchBlogData();
  }, [id, user, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Prepare tags array from comma-separated string
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      const blogData = {
        ...formData,
        tags: tagsArray
      };
      
      await blogService.updateBlog(id, blogData);
      
      setIsLoading(false);
      navigate('/blog/' + id);
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog. Please try again.');
      setIsLoading(false);
    }
  };
  
  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading blog content...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="blog-editor">
        <h1>Edit Blog Post</h1>
        
        <div className="preview-toggle">
          <button
            className={!showPreview ? 'active' : ''}
            onClick={() => setShowPreview(false)}
          >
            Edit
          </button>
          <button
            className={showPreview ? 'active' : ''}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>
        
        {showPreview ? (
          <div className="preview-panel">
            <h2>Preview</h2>
            <div className="preview-content">
              <h1>{formData.title}</h1>
              <p className="blog-summary">{formData.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: formData.content }}></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group form-group-half">
                <label htmlFor="coverImage">Cover Image URL</label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  className="form-control"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                className="form-control"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <div className="editor-help">
                <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">
                  Markdown Help
                </a>
              </div>
              <textarea
                id="content"
                name="content"
                className="form-control content-editor"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="form-control"
                value={formData.tags}
                onChange={handleChange}
                placeholder="technology, programming, react"
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate(`/blog/${id}`)}>
                Cancel
              </button>
              <button type="button" className="btn btn-outline" onClick={togglePreview}>
                Preview
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Blog Post'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBlogPage;
