import axios from 'axios';
import { getAuthToken } from './authService';

// Get correct API URL for browser requests
const getCorrectApiUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  // If we're in browser context and the URL contains 'api:' (Docker service name),
  // replace it with 'localhost' for browser requests
  if (typeof window !== 'undefined' && apiUrl.includes('api:')) {
    return apiUrl.replace('http://api:', 'http://localhost:');
  }
  return apiUrl;
};

const API_URL = getCorrectApiUrl();
const BLOGS_URL = `${API_URL}/api/blogs`;

// Helper function to get auth header
const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Blog service object
const blogService = {
  // Get all blogs with pagination
  getAllBlogs: async (page = 1, limit = 10, category = null) => {
    try {
      let url = `${BLOGS_URL}?page=${page}&limit=${limit}`;
      if (category) {
        url += `&category=${category}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get a single blog by ID or slug
  getBlogById: async (idOrSlug) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/${idOrSlug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },
  
  // For backwards compatibility
  getBlogBySlug: async (slug) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Create a new blog
  createBlog: async (blogData) => {
    try {
      const response = await axios.post(
        BLOGS_URL, 
        blogData, 
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update a blog
  updateBlog: async (id, blogData) => {
    try {
      const response = await axios.put(
        `${BLOGS_URL}/${id}`,
        blogData,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog
  deleteBlog: async (id) => {
    try {
      const response = await axios.delete(
        `${BLOGS_URL}/${id}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Get blogs by category
  getBlogsByCategory: async (category, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/category/${category}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  },

  // Get blogs by author
  getBlogsByAuthor: async (authorId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/author/${authorId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs by author:', error);
      throw error;
    }
  },
  
  // Get featured blogs
  getFeaturedBlogs: async () => {
    try {
      const response = await axios.get(`${BLOGS_URL}/featured`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      throw error;
    }
  },

  // Search blogs
  searchBlogs: async (query, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/search`, {
        params: { query, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    // Default categories to use if API fails
    const defaultCategories = [
      { _id: 'technology', name: 'Technology' },
      { _id: 'science', name: 'Science' },
      { _id: 'philosophy', name: 'Philosophy' },
      { _id: 'general', name: 'General' }
    ];
    
    try {
      // First try the dedicated categories endpoint
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        }
        throw new Error('Invalid categories data format');
      } catch (err) {
        console.log('First categories endpoint failed, trying alternative...');
        // If that fails, try the alternative endpoint
        try {
          const response = await axios.get(`${API_URL}/api/blogs/categories`);
          if (response.data && Array.isArray(response.data)) {
            return response.data;
          }
          throw new Error('Invalid categories data format');
        } catch (err2) {
          console.log('Second categories endpoint failed, using default categories');
          return defaultCategories;
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return defaultCategories;
    }
  },

  // Add comment to blog
  addComment: async (blogId, commentData) => {
    try {
      const response = await axios.post(
        `${BLOGS_URL}/${blogId}/comments`,
        commentData,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to blog ${blogId}:`, error);
      throw error;
    }
  },

  // Get comments for a blog
  getComments: async (blogId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BLOGS_URL}/${blogId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for blog ${blogId}:`, error);
      throw error;
    }
  },

  // Like a blog
  likeBlog: async (blogId) => {
    try {
      const response = await axios.post(
        `${BLOGS_URL}/${blogId}/like`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error(`Error liking blog ${blogId}:`, error);
      throw error;
    }
  },

  // Unlike a blog
  unlikeBlog: async (blogId) => {
    try {
      const response = await axios.delete(
        `${BLOGS_URL}/${blogId}/like`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error(`Error unliking blog ${blogId}:`, error);
      throw error;
    }
  }
};

export default blogService;
