import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import '../../styles/BlogCard.css';
import defaultBlogImage from '../../images/default-blog.jpg';
import defaultAvatarImage from '../../images/default-avatar.jpg';

const BlogCard = ({ blog, featured = false }) => {
  if (!blog) return null;

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const cardClass = featured ? 'blog-card blog-card-featured' : 'blog-card';
  const defaultImage = defaultBlogImage;
  const slug = blog.slug || blog.id;
  const category = typeof blog.category === 'object' ? (blog.category.name || 'General') : (blog.category || 'General');
  const categorySlug = category.toLowerCase();
  const author = blog.author || { id: 'unknown', username: 'Unknown' };
  
  return (
    <article className={cardClass}>
      <div className="blog-card-image">
        <Link to={`/blog/${slug}`}>
          <img 
            src={blog.coverImage || defaultImage} 
            alt={blog.title || 'Blog post'} 
            onError={(e) => { e.target.src = defaultImage; }}
          />
        </Link>
      </div>
      <div className="blog-card-content">
        <Link to={`/category/${categorySlug}`}>
          <span className="blog-card-category">{category}</span>
        </Link>
        <h3 className="blog-card-title">
          <Link to={`/blog/${slug}`}>{blog.title || 'Untitled'}</Link>
        </h3>
        <p className="blog-card-excerpt">{blog.excerpt || ''}</p>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="blog-card-author-image">
              <Link to={`/author/${author.id}`}>
                <img 
                  src={author.profilePicture || defaultAvatarImage} 
                  alt={author.username}
                  onError={(e) => { e.target.src = defaultAvatarImage; }}
                />
              </Link>
            </div>
            <Link to={`/author/${author.id}`}>
              <span className="blog-card-author-name">{author.username}</span>
            </Link>
          </div>
          <span className="blog-card-date">{blog.createdAt ? formatDate(blog.createdAt) : ''}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
