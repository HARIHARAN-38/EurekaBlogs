import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  if (!blog) {
    return null;
  }
  
  const { title, slug, excerpt, category, coverImage, author, createdAt, viewCount } = blog;
  
  // Handle missing or malformed dates
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Unknown date';
  
  // Use a placeholder image if no cover image is available
  const imageUrl = coverImage || 'https://via.placeholder.com/600x400?text=Eureka+Blogs';
  
  // Use a placeholder for the author avatar
  const avatarUrl = author?.profilePicture || 'https://via.placeholder.com/40x40?text=User';
  
  // Handle category - ensure it exists and is correctly formatted
  const categoryText = category ? (typeof category === 'object' ? category.name : category) : 'General';
  const categorySlug = categoryText.toLowerCase();
  
  // Ensure slug exists (use id as fallback)
  const blogUrl = slug ? `/blog/${slug}` : `/blog/${blog.id}`;

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <Link to={blogUrl}>
          <img src={imageUrl} alt={title || 'Blog post'} />
        </Link>
        <Link to={`/category/${categorySlug}`} className="blog-card-category">
          {categoryText}
        </Link>
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={blogUrl}>{title || 'Untitled Blog Post'}</Link>
        </h3>
        <div className="blog-card-meta">
          <div className="blog-card-author">
            <img src={avatarUrl} alt={author?.username || 'Author'} className="blog-card-avatar" />
            <span>{author?.username || 'Unknown Author'}</span>
          </div>
          <div className="blog-card-info">
            <span><FaRegCalendarAlt /> {formattedDate}</span>
            <span><FaEye /> {viewCount || 0}</span>
          </div>
        </div>
        <p className="blog-card-excerpt">
          {excerpt || (blog.content ? blog.content.substring(0, 150) + '...' : 'No content available')}
        </p>
        <Link to={blogUrl} className="blog-card-read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
