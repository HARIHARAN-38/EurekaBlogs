const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/search', blogController.searchBlogs);
router.get('/categories', blogController.getCategories);
router.get('/category/:category', blogController.getBlogsByCategory);
router.get('/author/:authorId', blogController.getBlogsByAuthor);
router.get('/:identifier', blogController.getBlogByIdOrSlug);

// Protected routes
router.post('/', protect, blogController.createBlog);
router.put('/:id', protect, blogController.updateBlog);
router.delete('/:id', protect, blogController.deleteBlog);

module.exports = router;
