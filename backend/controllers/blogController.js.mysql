const { Blog, User, Comment } = require('../models');

// Get all blogs with pagination
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const status = req.query.status || 'published';
    
    let whereClause = { status };
    if (category) {
      whereClause.category = category;
    }

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

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

    // Check if identifier is a number (ID) or string (slug)
    if (!isNaN(identifier)) {
      blog = await Blog.findByPk(identifier, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'profilePicture', 'bio']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'profilePicture']
              }
            ]
          }
        ]
      });
    } else {
      blog = await Blog.findOne({
        where: { slug: identifier },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'profilePicture', 'bio']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'profilePicture']
              }
            ]
          }
        ]
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

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);

    const blog = await Blog.create({
      title,
      content,
      category: category || 'Uncategorized',
      tags: tags || [],
      coverImage,
      status: status || 'published',
      userId,
      slug
    });

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

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is the author or an admin
    if (blog.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    await blog.update({
      title: title || blog.title,
      content: content || blog.content,
      category: category || blog.category,
      tags: tags || blog.tags,
      coverImage: coverImage || blog.coverImage,
      status: status || blog.status
    });

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog
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

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is the author or an admin
    if (blog.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await blog.destroy();

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
    const offset = (page - 1) * limit;

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: { category, status: 'published' },
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

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
    const offset = (page - 1) * limit;

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: { userId: authorId, status: 'published' },
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'profilePicture', 'bio']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

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
