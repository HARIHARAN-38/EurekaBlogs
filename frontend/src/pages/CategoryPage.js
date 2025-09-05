import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import blogService from '../services/blogService';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        const response = await blogService.getBlogsByCategory(category);
        
        if (response && response.success) {
          if (response.blogs && response.blogs.length > 0) {
            setBlogs(response.blogs);
          } else {
            // If no blogs found in this category, try sample data
            const filteredBlogs = getSampleBlogsByCategory(category);
            if (filteredBlogs && filteredBlogs.length > 0) {
              setBlogs(filteredBlogs);
            } else {
              setError('No blogs found in this category');
            }
          }
        } else {
          // Use sample blog data as fallback if API fails
          const filteredBlogs = getSampleBlogsByCategory(category);
          if (filteredBlogs && filteredBlogs.length > 0) {
            setBlogs(filteredBlogs);
          } else {
            setError('No blogs found in this category');
          }
        }
      } catch (err) {
        console.error('Error fetching blogs by category:', err);
        // Try fallback if API fails
        const filteredBlogs = getSampleBlogsByCategory(category);
        if (filteredBlogs && filteredBlogs.length > 0) {
          setBlogs(filteredBlogs);
        } else {
          setError('Error loading blogs');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [category]);
  
  // Generate sample blogs filtered by category
  const getSampleBlogsByCategory = (categoryName) => {
    // Create sample blog authors
    const authors = [
      { id: 1, username: 'ScienceExplorer', profilePicture: null, bio: 'Passionate about exploring the frontiers of science and sharing discoveries with the world.' },
      { id: 2, username: 'TechGuru', profilePicture: null, bio: 'Technology enthusiast with over a decade of experience in software development and AI research.' },
      { id: 3, username: 'ArtisticMind', profilePicture: null, bio: 'Artist, designer, and art historian exploring the intersections of creativity and culture.' },
      { id: 4, username: 'PhilosophyProf', profilePicture: null, bio: 'Philosophy professor specializing in existentialism and ethics in the digital age.' },
      { id: 5, username: 'EducationInnovator', profilePicture: null, bio: 'Education specialist focused on innovative teaching methods and lifelong learning.' }
    ];
    
    // Sample blogs data
    const sampleBlogs = [
      // Science Blogs
      {
        id: 1,
        title: 'The Future of Quantum Computing',
        slug: 'future-quantum-computing',
        excerpt: 'Exploring the revolutionary potential of quantum computing and its applications in solving complex problems.',
        content: 'Long-form content about quantum computing...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        author: authors[0],
        userId: 1,
        createdAt: '2025-08-15T10:30:00Z',
        viewCount: 1250,
        tags: ['quantum', 'computing', 'technology', 'future']
      },
      {
        id: 2,
        title: 'Climate Change Solutions: A Scientific Perspective',
        slug: 'climate-change-solutions',
        excerpt: 'An analysis of current scientific approaches to addressing global climate change.',
        content: 'Long-form content about climate change...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1581281867783-9c111622bd4a',
        author: authors[0],
        userId: 1,
        createdAt: '2025-08-20T14:15:00Z',
        viewCount: 980,
        tags: ['climate', 'environment', 'sustainability', 'research']
      },
      {
        id: 3,
        title: 'Neuroscience Breakthroughs: Understanding the Brain',
        slug: 'neuroscience-breakthroughs',
        excerpt: 'Recent discoveries in neuroscience that are changing our understanding of how the brain works.',
        content: 'Long-form content about neuroscience...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc',
        author: authors[0],
        userId: 1,
        createdAt: '2025-08-10T09:15:00Z',
        viewCount: 820,
        tags: ['neuroscience', 'brain', 'research', 'medicine']
      },
      
      // Technology Blogs
      {
        id: 4,
        title: 'AI in Everyday Life: The Invisible Revolution',
        slug: 'ai-everyday-life',
        excerpt: 'How artificial intelligence has seamlessly integrated into our daily routines, often without us noticing.',
        content: 'Long-form content about AI in daily life...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        author: authors[1],
        userId: 2,
        createdAt: '2025-08-17T11:20:00Z',
        viewCount: 1320,
        tags: ['AI', 'technology', 'machine-learning', 'digital-life']
      },
      {
        id: 5,
        title: 'The Future of Web Development: What to Learn in 2025',
        slug: 'future-web-development-2025',
        excerpt: 'Key skills and technologies that will define web development in the coming years.',
        content: 'Long-form content about future web development...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
        author: authors[1],
        userId: 2,
        createdAt: '2025-08-13T16:45:00Z',
        viewCount: 1570,
        tags: ['web-development', 'programming', 'technology', 'career']
      },
      {
        id: 6,
        title: 'Blockchain Beyond Cryptocurrency',
        slug: 'blockchain-beyond-cryptocurrency',
        excerpt: 'How distributed ledger technology is revolutionizing industries beyond finance.',
        content: 'Long-form content about blockchain applications...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
        author: authors[1],
        userId: 2,
        createdAt: '2025-08-05T13:20:00Z',
        viewCount: 940,
        tags: ['blockchain', 'technology', 'innovation', 'business']
      },
      
      // Philosophy Blogs
      {
        id: 7,
        title: 'The Meaning of Life in a Digital Age',
        slug: 'meaning-life-digital-age',
        excerpt: 'Exploring existential questions in the context of our increasingly digital existence.',
        content: 'Long-form content about meaning in the digital age...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1548625361-1adcab316530',
        author: authors[3],
        userId: 4,
        createdAt: '2025-08-18T10:00:00Z',
        viewCount: 890,
        tags: ['philosophy', 'digital-life', 'meaning', 'existentialism']
      },
      {
        id: 8,
        title: 'The Ethics of Artificial Intelligence',
        slug: 'ethics-artificial-intelligence',
        excerpt: 'Philosophical considerations regarding the development and deployment of AI systems.',
        content: 'Long-form content about AI ethics...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        author: authors[3],
        userId: 4,
        createdAt: '2025-08-08T11:30:00Z',
        viewCount: 760,
        tags: ['ethics', 'AI', 'philosophy', 'technology']
      },
      {
        id: 9,
        title: 'Freedom in an Age of Surveillance',
        slug: 'freedom-age-surveillance',
        excerpt: 'How concepts of liberty and autonomy are evolving in response to ubiquitous monitoring.',
        content: 'Long-form content about freedom and surveillance...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
        author: authors[3],
        userId: 4,
        createdAt: '2025-08-03T09:40:00Z',
        viewCount: 720,
        tags: ['freedom', 'privacy', 'philosophy', 'society']
      },
      
      // Art Blogs
      {
        id: 10,
        title: 'Digital Art Revolution: NFTs and Beyond',
        slug: 'digital-art-revolution',
        excerpt: 'Exploring how blockchain technology and NFTs are reshaping the art world and artist opportunities.',
        content: 'Long-form content about digital art and NFTs...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
        author: authors[2],
        userId: 3,
        createdAt: '2025-08-19T14:50:00Z',
        viewCount: 1180,
        tags: ['art', 'digital', 'NFTs', 'blockchain', 'creativity']
      },
      {
        id: 11,
        title: 'Classical Art Techniques in Modern Practice',
        slug: 'classical-techniques-modern-practice',
        excerpt: 'How traditional methods continue to influence and enhance contemporary art creation.',
        content: 'Long-form content about classical art techniques...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
        author: authors[2],
        userId: 3,
        createdAt: '2025-08-07T15:10:00Z',
        viewCount: 650,
        tags: ['art', 'traditional', 'techniques', 'painting']
      },
      {
        id: 12,
        title: 'Art as Social Commentary: From Daumier to Banksy',
        slug: 'art-social-commentary',
        excerpt: 'The evolution of art as a tool for political and social critique across centuries.',
        content: 'Long-form content about art and social commentary...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1569230516306-5a8cb5586399',
        author: authors[2],
        userId: 3,
        createdAt: '2025-08-02T12:20:00Z',
        viewCount: 870,
        tags: ['art', 'social-commentary', 'political', 'history']
      },
      
      // Education Blogs
      {
        id: 13,
        title: 'Online Learning Trends: The Future of Education',
        slug: 'online-learning-trends',
        excerpt: 'Analyzing the evolving landscape of online education and its impact on traditional institutions.',
        content: 'Long-form content about online learning trends...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
        author: authors[4],
        userId: 5,
        createdAt: '2025-08-16T13:40:00Z',
        viewCount: 1100,
        tags: ['education', 'e-learning', 'technology', 'future']
      },
      {
        id: 14,
        title: 'Early Childhood Education: New Approaches',
        slug: 'early-childhood-education',
        excerpt: 'Research-based strategies for supporting learning and development in young children.',
        content: 'Long-form content about early childhood education...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        author: authors[4],
        userId: 5,
        createdAt: '2025-08-09T10:15:00Z',
        viewCount: 920,
        tags: ['education', 'early-childhood', 'development', 'learning']
      },
      {
        id: 15,
        title: 'Rethinking Assessment in Modern Education',
        slug: 'rethinking-assessment-education',
        excerpt: 'Moving beyond standardized testing to more meaningful evaluation of student learning.',
        content: 'Long-form content about educational assessment...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b',
        author: authors[4],
        userId: 5,
        createdAt: '2025-08-04T14:30:00Z',
        viewCount: 780,
        tags: ['education', 'assessment', 'testing', 'pedagogy']
      }
    ];
    
    // Filter blogs by the requested category
    return sampleBlogs.filter(blog => blog.category.toLowerCase() === categoryName.toLowerCase());
  };

  return (
    <div className="container">
      <div className="category-page">
        <header className="page-header">
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
          <p>Explore our articles in the {category} category</p>
        </header>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="no-blogs-message">
            No blogs found in this category. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
