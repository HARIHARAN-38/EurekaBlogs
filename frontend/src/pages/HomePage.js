import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import blogService from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/blog/BlogCard';
import '../styles/HomePage.css';
import logoSvg from '../images/eureka-logo.svg';

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categories, setCategories] = useState([
    'Science', 'Technology', 'Philosophy', 'Art', 'Education'
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/create-blog');
  };

  const handleTutorialClick = () => {
    navigate('/tutorial');
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        // Try to fetch blogs from the API
        const featuredResponse = await blogService.getAllBlogs(1, 3);
        const recentResponse = await blogService.getAllBlogs(1, 6);
        
        if (featuredResponse && featuredResponse.success) {
          setFeaturedBlogs(featuredResponse.blogs);
        } else {
          // Use sample blogs as fallback
          const sampleBlogs = generateSampleBlogs();
          setFeaturedBlogs(sampleBlogs.slice(0, 3));
        }
        
        if (recentResponse && recentResponse.success) {
          setRecentBlogs(recentResponse.blogs);
        } else {
          // Use sample blogs as fallback
          const sampleBlogs = generateSampleBlogs();
          setRecentBlogs(sampleBlogs.slice(0, 6));
        }
        
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // Even if there's an error in processing, still show sample blogs
        const fallbackBlogs = generateSampleBlogs();
        setFeaturedBlogs(fallbackBlogs.slice(0, 3));
        setRecentBlogs(fallbackBlogs.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  
  // Helper function to generate sample blogs
  const generateSampleBlogs = () => {
    const authors = [
      { id: 1, username: 'ScienceExplorer', profilePicture: null },
      { id: 2, username: 'TechGuru', profilePicture: null },
      { id: 3, username: 'ArtisticMind', profilePicture: null },
      { id: 4, username: 'PhilosophyProf', profilePicture: null },
      { id: 5, username: 'EducationInnovator', profilePicture: null }
    ];
    
    return [
      // Science Blogs
      {
        id: 1,
        title: 'The Future of Quantum Computing',
        slug: 'future-quantum-computing',
        excerpt: 'Exploring the revolutionary potential of quantum computing and its applications in solving complex problems.',
        content: 'Quantum computing represents a paradigm shift in computational power...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        author: authors[0],
        createdAt: '2025-08-15T10:30:00Z',
        viewCount: 1250
      },
      {
        id: 2,
        title: 'Climate Change Solutions: A Scientific Perspective',
        slug: 'climate-change-solutions',
        excerpt: 'An analysis of current scientific approaches to addressing global climate change.',
        content: 'The scientific consensus on climate change is clear...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1581281867783-9c111622bd4a',
        author: authors[0],
        createdAt: '2025-08-20T14:15:00Z',
        viewCount: 980
      },
      {
        id: 3,
        title: 'Exploring Black Holes: What We Know in 2025',
        slug: 'exploring-black-holes-2025',
        excerpt: 'The latest discoveries about these mysterious cosmic phenomena and what they tell us about our universe.',
        content: 'Black holes continue to captivate both scientists and the public imagination...',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7',
        author: authors[0],
        createdAt: '2025-08-25T09:45:00Z',
        viewCount: 1050
      },
      
      // Technology Blogs
      {
        id: 4,
        title: 'AI in Everyday Life: The Invisible Revolution',
        slug: 'ai-everyday-life',
        excerpt: 'How artificial intelligence has seamlessly integrated into our daily routines, often without us noticing.',
        content: 'From voice assistants to recommendation systems...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        author: authors[1],
        createdAt: '2025-08-17T11:20:00Z',
        viewCount: 1320
      },
      {
        id: 5,
        title: 'Blockchain Beyond Crypto: Enterprise Applications',
        slug: 'blockchain-beyond-crypto',
        excerpt: 'Exploring how blockchain technology is transforming supply chains, healthcare, and more.',
        content: 'While most associate blockchain with cryptocurrencies...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
        author: authors[1],
        createdAt: '2025-08-22T16:30:00Z',
        viewCount: 950
      },
      {
        id: 6,
        title: 'The Rise of 5G: Transforming Connectivity',
        slug: 'rise-of-5g',
        excerpt: 'Understanding the impact of 5G networks on industry, entertainment, and urban development.',
        content: 'The fifth generation of mobile network technology...',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26',
        author: authors[1],
        createdAt: '2025-08-28T13:10:00Z',
        viewCount: 1150
      },
      
      // Philosophy Blogs
      {
        id: 7,
        title: 'The Meaning of Life in a Digital Age',
        slug: 'meaning-life-digital-age',
        excerpt: 'Exploring existential questions in the context of our increasingly digital existence.',
        content: 'As we spend more of our lives online...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1548625361-1adcab316530',
        author: authors[3],
        createdAt: '2025-08-18T10:00:00Z',
        viewCount: 890
      },
      {
        id: 8,
        title: 'Ethics in AI: Navigating the Gray Areas',
        slug: 'ethics-in-ai',
        excerpt: 'A philosophical examination of ethical dilemmas in artificial intelligence development.',
        content: 'As AI systems become more integrated into critical decisions...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1579566346927-c68383817a25',
        author: authors[3],
        createdAt: '2025-08-23T15:40:00Z',
        viewCount: 1020
      },
      {
        id: 9,
        title: 'Existentialism Today: Finding Authenticity',
        slug: 'existentialism-today',
        excerpt: 'Applying existentialist philosophy to modern challenges and the search for meaning.',
        content: 'The existentialist movement emphasized individual freedom...',
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3',
        author: authors[3],
        createdAt: '2025-08-26T09:15:00Z',
        viewCount: 870
      },
      
      // Art Blogs
      {
        id: 10,
        title: 'Digital Art Revolution: NFTs and Beyond',
        slug: 'digital-art-revolution',
        excerpt: 'Exploring how blockchain technology and NFTs are reshaping the art world and artist opportunities.',
        content: 'The art world has undergone a significant transformation...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
        author: authors[2],
        createdAt: '2025-08-19T14:50:00Z',
        viewCount: 1180
      },
      {
        id: 11,
        title: 'The Renaissance Reimagined: Classical Art in Modern Contexts',
        slug: 'renaissance-reimagined',
        excerpt: 'How contemporary artists are drawing inspiration from Renaissance techniques and themes.',
        content: 'The Renaissance period marked a rebirth of cultural and artistic achievement...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1577083552761-fc22d1e5a2b4',
        author: authors[2],
        createdAt: '2025-08-24T11:25:00Z',
        viewCount: 940
      },
      {
        id: 12,
        title: 'Street Art Culture: From Vandalism to Galleries',
        slug: 'street-art-culture',
        excerpt: 'The evolution of street art and its journey from illegal expression to mainstream recognition.',
        content: 'Once dismissed as mere graffiti and vandalism...',
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8',
        author: authors[2],
        createdAt: '2025-08-27T16:05:00Z',
        viewCount: 1080
      },
      
      // Education Blogs
      {
        id: 13,
        title: 'Online Learning Trends: The Future of Education',
        slug: 'online-learning-trends',
        excerpt: 'Analyzing the evolving landscape of online education and its impact on traditional institutions.',
        content: 'The acceleration of online learning during global events...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
        author: authors[4],
        createdAt: '2025-08-16T13:40:00Z',
        viewCount: 1100
      },
      {
        id: 14,
        title: 'The Importance of STEM Education for Future Generations',
        slug: 'importance-stem-education',
        excerpt: 'Why science, technology, engineering, and mathematics education matters more than ever.',
        content: 'As we move further into the information age...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        author: authors[4],
        createdAt: '2025-08-21T10:55:00Z',
        viewCount: 920
      },
      {
        id: 15,
        title: 'Lifelong Learning: Adapting to a Changing World',
        slug: 'lifelong-learning',
        excerpt: 'The growing importance of continuous education and skill development throughout life.',
        content: 'The concept of education as something that ends with formal schooling...',
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
        author: authors[4],
        createdAt: '2025-08-29T15:30:00Z',
        viewCount: 980
      }
    ];
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <img src={logoSvg} alt="Eureka Blogs Logo" />
            </div>
            <p className="hero-subtitle">Where ideas come to life</p>
            <p className="hero-description">
              Discover insightful articles, thought-provoking ideas, and expert perspectives on topics that matter.
            </p>
            <div className="hero-buttons">
              <Link to="/about" className="btn btn-primary">
                Learn More
              </Link>
              {user ? (
                <button onClick={handleCreateClick} className="btn btn-outline">
                  Create Now
                </button>
              ) : (
                <Link to="/register" className="btn btn-outline">
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Posts</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading featured posts...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : featuredBlogs.length > 0 ? (
            <div className="featured-blogs">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} featured={blog === featuredBlogs[0]} />
              ))}
            </div>
          ) : (
            <div className="no-blogs-message">No featured posts available yet.</div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore Topics</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link to={`/category/${category.toLowerCase()}`} key={category} className="category-card">
                <h3>{category}</h3>
                <div className="category-icon">
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="recent-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Posts</h2>
            <Link to="/blogs" className="view-all-link">
              View All <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading recent posts...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : recentBlogs.length > 0 ? (
            <div className="blogs-grid">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="no-blogs-message">No recent posts available yet.</div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to share your ideas?</h2>
            <p>Join our community of writers and readers today!</p>
            <button onClick={handleTutorialClick} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
