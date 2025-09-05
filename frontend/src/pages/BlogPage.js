import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { FaEdit, FaTrash, FaUser, FaClock, FaEye, FaTags } from 'react-icons/fa';
import blogService from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import '../styles/BlogPage.css';
import defaultBlogImage from '../images/default-blog.jpg';
import defaultAvatarImage from '../images/default-avatar.jpg';

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from the API first
        const response = await blogService.getBlogBySlug(slug);
        
        if (response && response.success) {
          setBlog(response.blog);
        } else {
          // If API call fails, use sample blog data as fallback
          const sampleBlog = generateSampleBlog(slug);
          if (sampleBlog) {
            setBlog(sampleBlog);
          } else {
            setError('Blog not found');
          }
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        // Try fallback to sample data if API fails
        const sampleBlog = generateSampleBlog(slug);
        if (sampleBlog) {
          setBlog(sampleBlog);
        } else {
          setError('Blog not found or error loading content');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);
  
  // Generate sample blog data for any slug
  const generateSampleBlog = (blogSlug) => {
    // Create sample blog authors
    const authors = [
      { id: 1, username: 'ScienceExplorer', profilePicture: null, bio: 'Passionate about exploring the frontiers of science and sharing discoveries with the world.' },
      { id: 2, username: 'TechGuru', profilePicture: null, bio: 'Technology enthusiast with over a decade of experience in software development and AI research.' },
      { id: 3, username: 'ArtisticMind', profilePicture: null, bio: 'Artist, designer, and art historian exploring the intersections of creativity and culture.' },
      { id: 4, username: 'PhilosophyProf', profilePicture: null, bio: 'Philosophy professor specializing in existentialism and ethics in the digital age.' },
      { id: 5, username: 'EducationInnovator', profilePicture: null, bio: 'Education specialist focused on innovative teaching methods and lifelong learning.' },
      { id: 6, username: 'CurrentUser', profilePicture: null, bio: 'Active contributor to Eureka Blogs with interests across multiple disciplines.' }
    ];
    
    // Sample blogs data
    const sampleBlogs = [
      // Science Blogs
      {
        id: 1,
        title: 'The Future of Quantum Computing',
        slug: 'future-quantum-computing',
        excerpt: 'Exploring the revolutionary potential of quantum computing and its applications in solving complex problems.',
        content: `
# The Future of Quantum Computing

Quantum computing represents a paradigm shift in computational power that will revolutionize fields from cryptography to drug discovery.

## What Makes Quantum Computing Different?

Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits." These qubits can exist in multiple states simultaneously due to a phenomenon called superposition. This gives quantum computers the theoretical ability to process vast amounts of information simultaneously.

## Current Developments

Recent breakthroughs include:

- Google's claim of quantum supremacy with their 53-qubit Sycamore processor
- IBM's roadmap to build a 1,000+ qubit quantum computer by 2023
- Microsoft's topological qubit research for more stable quantum systems

## Potential Applications

### Cryptography
Quantum computers could break current encryption methods, necessitating new quantum-resistant algorithms.

### Drug Discovery
Simulating molecular interactions at the quantum level could dramatically speed up drug development.

### Optimization Problems
Complex logistics, financial modeling, and resource allocation problems could be solved more efficiently.

## Challenges Ahead

Despite the promise, significant challenges remain:

1. Qubit stability and error correction
2. Scaling quantum systems while maintaining coherence
3. Developing quantum algorithms that provide real advantages
4. Making quantum computing accessible to researchers across disciplines

## When Will Quantum Computers Be Mainstream?

While fully functional, general-purpose quantum computers may still be decades away, specialized quantum systems solving specific problems could become commercially valuable within 5-10 years.

The race for quantum advantage is accelerating, with both nation-states and private companies investing billions. The question isn't if quantum computing will transform our technological landscape, but when and how dramatically.
        `,
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
        content: `
# Climate Change Solutions: A Scientific Perspective

The scientific consensus on climate change is clear: human activities have warmed the planet, and we need innovative solutions to address this global challenge.

## Understanding the Problem

Global temperatures have risen approximately 1.1°C since pre-industrial times. This warming is causing:

- More frequent and intense extreme weather events
- Rising sea levels threatening coastal communities
- Disruptions to ecosystems and biodiversity loss
- Impacts on agriculture and food security

## Scientific Solutions Being Developed

### Renewable Energy Transformation

The most important solution is transitioning from fossil fuels to renewable energy sources:

- Solar power costs have dropped 89% since 2010
- Wind energy is now cost-competitive with fossil fuels
- Energy storage technologies are advancing rapidly
- Smart grid systems can optimize distribution

### Carbon Capture and Storage (CCS)

Technologies to remove carbon dioxide from the atmosphere include:

1. Direct air capture systems
2. Enhanced weathering techniques
3. Bioenergy with carbon capture
4. Reforestation and soil carbon sequestration

### Climate-Resilient Infrastructure

Engineering solutions to adapt to already inevitable climate impacts:

- Sea walls and water management systems
- Heat-resistant building materials
- Climate-responsive urban planning
- Agricultural innovations for changing conditions

## The Role of Policy and Collective Action

Scientific solutions must be paired with effective policies:

- Carbon pricing mechanisms
- International cooperation frameworks
- Investment in research and development
- Support for developing nations' transition

## The Path Forward

While the climate challenge is daunting, the scientific community is optimistic that with proper investment and political will, we can limit warming to manageable levels. The key is acting decisively within this decade to implement the solutions we already have while continuing to innovate.

The cost of inaction far exceeds the cost of addressing climate change, both economically and in terms of human welfare. Science points the way forward—now we need the collective will to follow that path.
        `,
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1581281867783-9c111622bd4a',
        author: authors[0],
        userId: 1,
        createdAt: '2025-08-20T14:15:00Z',
        viewCount: 980,
        tags: ['climate', 'environment', 'sustainability', 'research']
      },
      // Technology Blogs
      {
        id: 4,
        title: 'AI in Everyday Life: The Invisible Revolution',
        slug: 'ai-everyday-life',
        excerpt: 'How artificial intelligence has seamlessly integrated into our daily routines, often without us noticing.',
        content: `
# AI in Everyday Life: The Invisible Revolution

From voice assistants to recommendation systems, artificial intelligence has quietly transformed how we live, work, and interact with technology.

## The Ubiquity of AI

AI has become so embedded in our daily lives that we often don't notice its presence:

- **Smartphone features**: Predictive text, voice assistants, photo organization
- **Entertainment**: Personalized streaming recommendations, music discovery
- **Navigation**: Real-time traffic routing, estimated arrival times
- **Home**: Smart thermostats, security systems, energy optimization

## How Today's AI Works

Modern AI systems primarily use machine learning techniques where algorithms improve through exposure to data. The most transformative approaches include:

### Deep Learning

Neural networks with multiple layers that can identify complex patterns in data, powering advances in:

- Image and facial recognition
- Natural language processing
- Speech recognition and synthesis

### Reinforcement Learning

Systems that learn optimal behavior through trial, error, and rewards, used in:

- Game playing AI (like AlphaGo)
- Robotics
- Resource management systems

## The Invisible Impact

### Decision Support
AI helps humans make better decisions in fields like medicine, finance, and education by analyzing data at scales impossible for humans.

### Automation of Routine
From email filtering to automated customer service, AI handles routine tasks, freeing human attention for more complex work.

### Personalization
Our digital experiences are increasingly tailored to our preferences and behaviors, creating efficiency but raising questions about filter bubbles.

## The Human Element

As AI becomes more prevalent, important questions arise:

1. How do we ensure AI systems are fair and unbiased?
2. What skills should humans develop in an AI-augmented world?
3. How do we maintain privacy when AI requires data to function?

## Looking Forward

The most profound technologies are those that disappear—they weave themselves into everyday life until they're indistinguishable from it. AI is following this path, becoming an invisible but essential part of how our world functions. Understanding its presence helps us engage more thoughtfully with the technology shaping our future.
        `,
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        author: authors[1],
        userId: 2,
        createdAt: '2025-08-17T11:20:00Z',
        viewCount: 1320,
        tags: ['AI', 'technology', 'machine-learning', 'digital-life']
      },
      // Philosophy Blogs
      {
        id: 7,
        title: 'The Meaning of Life in a Digital Age',
        slug: 'meaning-life-digital-age',
        excerpt: 'Exploring existential questions in the context of our increasingly digital existence.',
        content: `
# The Meaning of Life in a Digital Age

As we spend more of our lives online, fundamental philosophical questions about meaning, identity, and human connection take on new dimensions.

## Digital Existence and Authenticity

Philosophers from Kierkegaard to Sartre emphasized authenticity as central to meaningful existence. In the digital age, we must ask:

- Are our online personas authentic expressions of self or performative masks?
- Can virtual connections provide genuine meaning and fulfillment?
- How does constant documentation of experience change the experience itself?

## The Search for Meaning

Viktor Frankl argued that meaning comes from three sources:
1. Creating work or doing deeds
2. Experiencing something or encountering someone
3. The attitude we take toward unavoidable suffering

Each of these paths to meaning is transformed in digital space:

### Creative Work in Virtual Spaces

Digital creation—from coding to content creation—provides new avenues for meaningful work but raises questions about permanence in an ephemeral digital landscape.

### Experiencing and Encountering

Virtual experiences and relationships can be profound, yet different from physical encounters. How do we assess their authenticity and depth?

### Suffering and Resilience

Online spaces can both amplify suffering (through phenomena like cyberbullying) and provide community support. The attitude we take toward digital hardships becomes part of our meaning-making.

## Identity in Flux

In pre-digital philosophy, identity was often seen as somewhat stable. Today, we manage multiple identities across platforms, raising questions about:

- The fragmentation of self
- The curation of identity as a form of self-creation
- The relationship between our physical and digital selves

## The Paradox of Connection

Digital tools connect us globally yet can isolate us locally. This paradox challenges traditional philosophical understandings of community and belonging.

## Finding Balance

Perhaps the most pressing philosophical challenge of our time is finding balance—integrating digital and physical existence in ways that enhance meaning rather than diminish it.

The ancient Delphic maxim "Know thyself" takes on new urgency when the self exists across multiple realms. Self-knowledge now requires understanding not just who we are, but who we are becoming in our increasingly digital lives.
        `,
        category: 'Philosophy',
        coverImage: 'https://images.unsplash.com/photo-1548625361-1adcab316530',
        author: authors[3],
        userId: 4,
        createdAt: '2025-08-18T10:00:00Z',
        viewCount: 890,
        tags: ['philosophy', 'digital-life', 'meaning', 'existentialism']
      },
      // Art Blogs
      {
        id: 10,
        title: 'Digital Art Revolution: NFTs and Beyond',
        slug: 'digital-art-revolution',
        excerpt: 'Exploring how blockchain technology and NFTs are reshaping the art world and artist opportunities.',
        content: `
# Digital Art Revolution: NFTs and Beyond

The art world has undergone a significant transformation with the emergence of blockchain technology and NFTs (Non-Fungible Tokens), creating new opportunities and challenges for artists, collectors, and institutions.

## The Rise of Digital Ownership

NFTs have introduced a concept previously difficult in the digital realm: verifiable ownership of digital assets. This has revolutionized digital art by:

- Enabling artists to sell unique or limited-edition digital works
- Creating provable scarcity in an otherwise infinitely reproducible medium
- Establishing transparent provenance records
- Allowing for artist royalties on secondary sales

## Beyond the Hype

While early NFT sales generated headlines with multi-million dollar prices, the longer-term impact goes deeper:

### Democratization of Art Markets

Digital platforms remove traditional gatekeepers, allowing artists to:
- Connect directly with global audiences
- Build communities around their work
- Experiment with new economic models

### New Aesthetic Possibilities

The intersection of technology and art has spawned entirely new art forms:
- Generative art created with algorithms
- Dynamic art that changes based on external data
- Interactive experiences blending art and code
- Collaborative works across global communities

## Challenges and Criticisms

The digital art revolution faces significant questions:

1. **Environmental Impact**: Early blockchain technologies consumed substantial energy
2. **Accessibility**: Technical barriers to creation and collection
3. **Valuation**: Determining intrinsic vs. speculative value
4. **Preservation**: Ensuring long-term access to digital works

## The Future of Art Practice

As technology evolves, we're seeing new approaches emerge:

- More sustainable blockchain alternatives
- Integration of physical and digital elements in hybrid artworks
- Virtual reality galleries and immersive experiences
- AI collaboration with human artists

## Cultural Significance

This revolution represents more than new technology—it reflects changing attitudes about:
- What constitutes art
- How we experience cultural artifacts
- The relationship between creator and audience
- The meaning of ownership in a digital world

While some traditional institutions resist these changes, others are embracing them, recognizing that art has always evolved alongside technology, from the invention of photography to video art to the digital frontier we now explore.
        `,
        category: 'Art',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
        author: authors[2],
        userId: 3,
        createdAt: '2025-08-19T14:50:00Z',
        viewCount: 1180,
        tags: ['art', 'digital', 'NFTs', 'blockchain', 'creativity']
      },
      // Education Blogs
      {
        id: 13,
        title: 'Online Learning Trends: The Future of Education',
        slug: 'online-learning-trends',
        excerpt: 'Analyzing the evolving landscape of online education and its impact on traditional institutions.',
        content: `
# Online Learning Trends: The Future of Education

The acceleration of online learning during global events has fundamentally altered the education landscape, creating both opportunities and challenges for learners, educators, and institutions.

## The Evolution of Digital Learning

Online education has progressed through several phases:
1. Early correspondence courses
2. Static educational websites
3. Massive Open Online Courses (MOOCs)
4. Interactive, adaptive learning platforms
5. AI-powered personalized education

Each evolution has made education more accessible while presenting new pedagogical questions.

## Current Trends Reshaping Education

### Microlearning and Skill-Based Education

The rise of short, focused learning modules aligned with specific skills:
- Industry-recognized micro-credentials
- Stackable certificates building to degrees
- Just-in-time learning for workplace needs

### Immersive Technologies

Virtual and augmented reality creating new learning environments:
- Virtual laboratories for science education
- Historical recreations for immersive history learning
- Medical training through realistic simulations
- Global field trips accessible to all students

### AI-Enhanced Learning

Artificial intelligence personalizing the educational experience:
- Adaptive learning paths based on individual progress
- Intelligent tutoring systems providing feedback
- Automated grading with substantive feedback
- Early intervention systems for struggling students

## Challenges to Address

Despite the promise, online learning must overcome significant hurdles:

1. **Digital Divide**: Ensuring equitable access to technology
2. **Engagement**: Maintaining motivation without physical presence
3. **Assessment Integrity**: Developing meaningful, secure evaluation methods
4. **Community Building**: Fostering connection and collaboration
5. **Practical Skills**: Teaching hands-on subjects effectively

## The Hybrid Future

Rather than replacing traditional education entirely, we're seeing the emergence of blended models that combine:
- In-person experiences for hands-on learning and socialization
- Online components for flexibility and personalization
- Community-based learning hubs
- Global classroom connections

## Lifelong Learning Imperative

Perhaps most significantly, online education is enabling the shift to continuous learning throughout life—a necessity in a rapidly changing economy where skills quickly become obsolete.

Educational institutions, employers, and learners are all adapting to this new paradigm where education isn't confined to a specific life stage but becomes an ongoing process of growth and adaptation. Those who embrace this shift will be best positioned to thrive in tomorrow's knowledge economy.
        `,
        category: 'Education',
        coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
        author: authors[4],
        userId: 5,
        createdAt: '2025-08-16T13:40:00Z',
        viewCount: 1100,
        tags: ['education', 'e-learning', 'technology', 'future']
      }
    ];
    
    // Find the blog that matches the requested slug
    const foundBlog = sampleBlogs.find(blog => blog.slug === blogSlug);
    
    // If the slug isn't in our sample data, create a generic blog post
    // This ensures that no "Blog Not Found" errors occur
    if (!foundBlog) {
      return {
        id: 999,
        title: blogSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        slug: blogSlug,
        excerpt: 'This is a dynamically generated blog post based on the requested URL.',
        content: `
# ${blogSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

This blog post was dynamically generated based on the URL you visited. 

## About This Post

While this specific content wasn't in our original database, we've created this placeholder to ensure you have something to read.

## Explore More

We recommend checking out some of our featured articles on the homepage, or browsing through our category pages to find more interesting content.

Thank you for visiting Eureka Blogs!
        `,
        category: 'General',
        coverImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32',
        author: authors[5],
        userId: 6,
        createdAt: new Date().toISOString(),
        viewCount: Math.floor(Math.random() * 500) + 100,
        tags: ['general', 'blog']
      };
    }
    
    return foundBlog;
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await blogService.deleteBlog(blog.id);
      
      if (response.success) {
        navigate('/');
      } else {
        setError(response.message || 'Failed to delete blog');
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Error deleting blog');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container">
        <div className="not-found-container">
          <h2>Blog Not Found</h2>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && user.id === blog.userId;
  const tags = blog.tags && Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="blog-page">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="blog-hero-image">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            onError={(e) => { e.target.src = defaultBlogImage; }}
          />
        </div>
      )}

      <div className="container">
        <article className="blog-content">
          {/* Blog Header */}
          <header className="blog-header">
            <Link to={`/category/${blog.category}`} className="blog-category">
              {blog.category}
            </Link>
            <h1 className="blog-title">{blog.title}</h1>
            
            <div className="blog-meta">
              <div className="blog-author">
                <div className="blog-author-image">
                  <Link to={`/author/${blog.author.id}`}>
                    <img 
                      src={blog.author.profilePicture || defaultAvatarImage} 
                      alt={blog.author.username}
                      onError={(e) => { e.target.src = defaultAvatarImage; }}
                    />
                  </Link>
                </div>
                <div className="blog-author-info">
                  <Link to={`/author/${blog.author.id}`}>
                    <span className="blog-author-name">{blog.author.username}</span>
                  </Link>
                </div>
              </div>
              
              <div className="blog-details">
                <div className="blog-detail">
                  <FaClock /> <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="blog-detail">
                  <FaEye /> <span>{blog.viewCount} views</span>
                </div>
              </div>
            </div>
            
            {/* Author Actions */}
            {isAuthor && (
              <div className="author-actions">
                <Link to={`/edit-blog/${blog.id}`} className="btn btn-outline">
                  <FaEdit /> Edit
                </Link>
                <button 
                  onClick={handleDeleteClick} 
                  className="btn btn-danger"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </header>

          {/* Blog Body */}
          <div className="blog-body">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Blog Footer */}
          <footer className="blog-footer">
            {tags.length > 0 && (
              <div className="blog-tags">
                <FaTags />
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <Link key={index} to={`/tag/${tag}`} className="tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="blog-share">
              <span>Share:</span>
              <div className="share-buttons">
                {/* You can add social sharing functionality here */}
              </div>
            </div>
          </footer>

          {/* Author Bio */}
          <div className="author-bio">
            <div className="author-bio-image">
              <img 
                src={blog.author.profilePicture || defaultAvatarImage} 
                alt={blog.author.username}
                onError={(e) => { e.target.src = defaultAvatarImage; }}
              />
            </div>
            <div className="author-bio-content">
              <h3>About {blog.author.username}</h3>
              <p>{blog.author.bio || `${blog.author.username} is a contributor at Eureka Blogs.`}</p>
              <Link to={`/author/${blog.author.id}`} className="btn btn-outline">
                View Profile
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Blog</h2>
            <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleCancelDelete} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
