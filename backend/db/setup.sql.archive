-- Create Eureka Blogs Database
CREATE DATABASE IF NOT EXISTS eureka_blogs;
USE eureka_blogs;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profilePicture VARCHAR(255) DEFAULT 'default-avatar.jpg',
  bio TEXT,
  role ENUM('user', 'admin') DEFAULT 'user',
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  coverImage VARCHAR(255),
  excerpt TEXT,
  category VARCHAR(100),
  tags TEXT,
  status ENUM('draft', 'published', 'archived') DEFAULT 'published',
  viewCount INT DEFAULT 0,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_status (status)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  userId INT NOT NULL,
  blogId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_blogId (blogId)
);

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, email, password, role, bio)
VALUES ('admin', 'admin@eureka-blogs.com', '$2b$10$1JlHU7Cj9DvzPzlxKfCjguUqFvX5KbyhRyo8j8J60iXGGlYT8ulke', 'admin', 'Administrator of Eureka Blogs');

-- Insert sample regular user (password: user123)
INSERT INTO users (username, email, password, bio)
VALUES ('user', 'user@example.com', '$2b$10$3dRxkVkPgL1K7Yd0vxMN3eQKKCR.3HXJKEKDcvFJLlGFeuXQQjJhi', 'Regular user who loves blogging about science and technology');

-- Insert sample blog posts
INSERT INTO blogs (title, slug, content, category, tags, userId, excerpt)
VALUES 
('Getting Started with React Hooks', 'getting-started-with-react-hooks', '# Introduction to React Hooks\n\nReact Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component.\n\n## useState Hook\n\nThe useState hook is the most basic hook that allows you to add state to your functional components.\n\n```jsx\nimport React, { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n## useEffect Hook\n\nThe useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.\n\n```jsx\nimport React, { useState, useEffect } from "react";\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n    \n    // Cleanup function (equivalent to componentWillUnmount)\n    return () => {\n      document.title = "React App";\n    };\n  }, [count]);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n## Conclusion\n\nReact Hooks make it easier to reuse stateful logic between components, split large components into smaller functions, and use React features without classes.', 
'technology', '["react", "javascript", "webdev", "frontend"]', 1, 'React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component. This post introduces the most common hooks and how to use them effectively.');

INSERT INTO blogs (title, slug, content, category, tags, userId, excerpt)
VALUES 
('The Future of Quantum Computing', 'the-future-of-quantum-computing', '# The Future of Quantum Computing\n\nQuantum computing represents a paradigm shift in how we process information, leveraging the principles of quantum mechanics to perform calculations in ways that classical computers cannot.\n\n## What Makes Quantum Computing Different?\n\nUnlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or qubits. Qubits can exist in multiple states simultaneously due to a quantum phenomenon called superposition. This allows quantum computers to process vast amounts of information in parallel.\n\n## Current Challenges\n\nDespite the immense potential, quantum computing faces significant challenges:\n\n1. **Quantum Decoherence**: Qubits are extremely sensitive to their environment and can lose their quantum properties quickly.\n2. **Error Correction**: Quantum systems are prone to errors that need sophisticated correction methods.\n3. **Scalability**: Building quantum computers with enough qubits to outperform classical computers is technically challenging.\n\n## Potential Applications\n\nWhen these challenges are overcome, quantum computing will revolutionize fields such as:\n\n### Cryptography\nQuantum computers could break many current encryption methods but also enable quantum encryption that\'s theoretically unbreakable.\n\n### Drug Discovery\nSimulating molecular interactions with high accuracy could dramatically accelerate the development of new medicines.\n\n### Optimization Problems\nComplex logistics, financial modeling, and resource allocation problems could be solved much more efficiently.\n\n### Artificial Intelligence\nQuantum computing could enhance machine learning algorithms, enabling them to process and find patterns in larger datasets.\n\n## The Road Ahead\n\nThe race to achieve quantum supremacy—the point where a quantum computer can solve a problem that classical computers practically cannot—is intensifying. Companies like IBM, Google, and Microsoft are making significant investments in this field.\n\nWhile practical, large-scale quantum computers may still be years away, the potential benefits make this one of the most exciting frontiers in computing research.', 
'science', '["quantum", "computing", "technology", "physics"]', 2, 'Quantum computing represents a paradigm shift in how we process information, leveraging the principles of quantum mechanics to perform calculations in ways that classical computers cannot. This post explores the future possibilities and challenges of this revolutionary technology.');

INSERT INTO blogs (title, slug, content, category, tags, userId, excerpt)
VALUES 
('The Philosophy of Artificial Intelligence', 'the-philosophy-of-artificial-intelligence', '# The Philosophy of Artificial Intelligence\n\nAs artificial intelligence continues to evolve and integrate into our daily lives, it raises profound philosophical questions about consciousness, ethics, and what it means to be human.\n\n## Can Machines Think?\n\nAlan Turing proposed the famous "Turing Test" as a benchmark for machine intelligence, suggesting that if a machine could convincingly simulate human conversation, it should be considered intelligent. But many philosophers argue that passing the Turing Test demonstrates only the simulation of intelligence, not true understanding or consciousness.\n\nJohn Searle\'s "Chinese Room" thought experiment illustrates this distinction. Imagine a person who doesn\'t understand Chinese locked in a room with a rulebook for responding to Chinese messages. The person can produce appropriate Chinese responses by following the rules without understanding Chinese. Searle argues that AI systems similarly manipulate symbols according to rules without understanding their meaning.\n\n## The Hard Problem of Consciousness\n\nPhilosopher David Chalmers coined the term "hard problem of consciousness" to describe the challenge of explaining why and how physical processes in the brain give rise to subjective experience. This remains one of the central mysteries in philosophy of mind and presents a significant challenge for AI:\n\n- If we can\'t fully explain human consciousness, how can we determine whether an AI system is conscious?\n- Could artificial consciousness be fundamentally different from human consciousness?\n- Would we recognize consciousness in a digital form if it emerged?\n\n## Ethical Implications\n\nThe development of increasingly sophisticated AI systems raises pressing ethical questions:\n\n1. **Moral Status**: What rights should be accorded to advanced AI systems? If an AI could experience suffering, would we have moral obligations toward it?\n\n2. **Responsibility**: Who bears responsibility when an autonomous AI system causes harm—the developers, the users, or the AI itself?\n\n3. **Human Identity**: As AI systems become more integrated into our lives and potentially enhance human capabilities, what does it mean to be human? Are we diminished or enhanced by these technologies?\n\n## The Future of Human-AI Relations\n\nPhilosophers and ethicists are actively debating how humans should relate to increasingly advanced AI systems:\n\n- Should we design AI to be subservient to human needs, or should we allow for the possibility of AI autonomy?\n- How can we ensure AI development aligns with human values when these values vary across cultures and individuals?\n- Is the singularity—the hypothetical point where AI surpasses human intelligence—something to fear or embrace?\n\nAs we continue to develop more sophisticated AI, these philosophical questions move from theoretical considerations to practical concerns that require thoughtful engagement from developers, policymakers, and society at large.', 
'philosophy', '["ai", "consciousness", "ethics", "philosophy"]', 1, 'As artificial intelligence continues to evolve and integrate into our daily lives, it raises profound philosophical questions about consciousness, ethics, and what it means to be human. This post explores the philosophical implications of advancing AI technology.');

-- Insert sample comments
INSERT INTO comments (content, userId, blogId)
VALUES ('Great introduction to React Hooks! I especially found the useEffect explanation helpful.', 2, 1);

INSERT INTO comments (content, userId, blogId)
VALUES ('I wonder how quantum computing will affect cybersecurity in the next decade. Any thoughts?', 1, 2);

INSERT INTO comments (content, userId, blogId)
VALUES ('The Chinese Room argument is fascinating. I think it really highlights the limitations of our current approach to AI.', 2, 3);
