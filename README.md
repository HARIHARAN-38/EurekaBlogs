````markdown
# Eureka Blogs

A full-stack blog application inspired by [Citizens of Science](https://citizensofscience.com/).

![Eureka Blogs Screenshot](https://via.placeholder.com/800x400?text=Eureka+Blogs+Screenshot)

## Features

- Create, read, update, and delete blog posts
- User authentication and profile management
- Rich text editing for blog content
- Category and tag filtering
- Responsive, mobile-first design
- Clean, modern UI

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS3 with responsive design
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication

## Getting Started

### Local Development

Install all dependencies and start both servers:

```bash
# Install dependencies for all projects
npm run install:all

# Start both frontend and backend servers
npm start
```

Then visit http://localhost:3000 to access the application.

## Deployment to Vercel

### Prerequisites
- A MongoDB Atlas account with a configured cluster
- A Vercel account linked to your GitHub repository

### Deployment Steps
1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure the following environment variables in Vercel:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
4. Deploy!

## License

[MIT License](LICENSE)

A full-stack blog application where users can create, read, update, and delete blog posts.

## Features

- Create new blog posts (title, content, author, timestamp)
- Read existing blog posts in a clean, responsive UI
- Update blog post content
- Delete blog posts
- Mobile-first responsive design

## Tech Stack

### Frontend
- React.js
- CSS3/SASS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- RESTful API

## Deployment

The application is deployable on platforms like Vercel, Netlify, or Render.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/HARIHARAN-38/Eureka-blogs.git
   cd Eureka-blogs
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables (create `.env` files in both frontend and backend)

5. Set up MySQL database

6. Run the development servers
   ```bash
   # Run backend (from backend directory)
   npm run start
   
   # Run frontend (from frontend directory)
   npm run start
   ```

## License

MIT