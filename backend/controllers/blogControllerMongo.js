const { Blog, User, Comment } = require('../models/mongodb');

// Get all blogs with pagination
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const status = req.query.status || 'published';
    
    // Build filter
    let filter = { status };
    if (category) {
      filter.category = category;
    }

    // Get total count
    const count = await Blog.countDocuments(filter);
    
    // Get blogs with pagination
    const blogs = await Blog.find(filter)
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
};

// Get single blog by ID or slug
exports.getBlogByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    let blog;

    // Check if identifier is ObjectId or slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    if (isObjectId) {
      blog = await Blog.findById(identifier)
        .populate('author', 'username profilePicture bio')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username profilePicture'
          }
        });
    } else {
      blog = await Blog.findOne({ slug: identifier })
        .populate('author', 'username profilePicture bio')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username profilePicture'
          }
        });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    blog.viewCount += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, coverImage, status } = req.body;
    const userId = req.user.id;  // Assuming this comes from auth middleware

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    // Create slug
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      category: category || 'Uncategorized',
      tags: tags || [],
      coverImage,
      status: status || 'published',
      author: userId,
      slug,
      excerpt: content.substring(0, 200) + '...'  // Create excerpt from content
    });

    // Populate author details
    await blog.populate('author', 'username profilePicture');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message
    });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags, coverImage, status } = req.body;
    const userId = req.user.id;  // Assuming this comes from auth middleware

    // Find the blog
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is the author or an admin
    if (blog.author.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    // Create updated blog object
    const updatedBlog = {
      title: title || blog.title,
      content: content || blog.content,
      category: category || blog.category,
      tags: tags || blog.tags,
      coverImage: coverImage || blog.coverImage,
      status: status || blog.status
    };

    // If content is updated, update excerpt too
    if (content) {
      updatedBlog.excerpt = content.substring(0, 200) + '...';
    }

    // Update the blog
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
      .populate('author', 'username profilePicture');

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog: result
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message
    });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;  // Assuming this comes from auth middleware

    // Find the blog
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is the author or an admin
    if (blog.author.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    // Also delete associated comments
    await Comment.deleteMany({ blog: id });

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message
    });
  }
};

// Get blogs by category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Case insensitive search for category
    const count = await Blog.countDocuments({ 
      category: { $regex: new RegExp(category, 'i') }, 
      status: 'published' 
    });
    
    const blogs = await Blog.find({ 
      category: { $regex: new RegExp(category, 'i') }, 
      status: 'published' 
    })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs by category',
      error: error.message
    });
  }
};

// Get blogs by author
exports.getBlogsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const count = await Blog.countDocuments({ 
      author: authorId, 
      status: 'published' 
    });
    
    const blogs = await Blog.find({ 
      author: authorId, 
      status: 'published' 
    })
      .populate('author', 'username profilePicture bio')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    console.error('Error fetching blogs by author:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs by author',
      error: error.message
    });
  }
};

// Search blogs by title or content
exports.searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Search blogs with text index
    const searchFilter = {
      $text: { $search: query },
      status: 'published'
    };
    
    const count = await Blog.countDocuments(searchFilter);
    
    const blogs = await Blog.find(searchFilter)
      .populate('author', 'username profilePicture')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit);
      
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search blogs',
      error: error.message
    });
  }
};

// Get all unique categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { status: 'published' });
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// Get featured blogs
exports.getFeaturedBlogs = async (req, res) => {
  try {
    // Get top 5 most viewed blogs
    const blogs = await Blog.find({ status: 'published' })
      .populate('author', 'username profilePicture')
      .sort({ viewCount: -1 })
      .limit(5);
      
    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured blogs',
      error: error.message
    });
  }
};
