# Eureka Blogs - Setup Guide

This guide will help you set up and run the Eureka Blogs application on your local machine.

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- MySQL (v8 or later)

## Project Structure

```
Eureka-blogs/
├── backend/             # Backend server code
│   ├── controllers/     # API controllers
│   ├── middleware/      # Middleware functions
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── db/              # Database setup scripts
│   └── server.js        # Server entry point
│
└── frontend/            # React frontend code
    ├── public/          # Static files
    └── src/             # Source code
        ├── assets/      # Images, fonts, etc.
        ├── components/  # Reusable components
        ├── contexts/    # Context providers
        ├── pages/       # Page components
        ├── services/    # API services
        └── styles/      # CSS files
```

## Setup Options

### Option 1: Automated Setup (Recommended)

1. Run the local setup script which will guide you through the installation process:
   ```bash
   ./local_setup.sh
   ```

2. Set up your database:
   ```bash
   ./setup_db.sh
   ```
   
3. Start both the frontend and backend servers with a single command:
   ```bash
   npm start
   ```

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your MySQL database:
   ```bash
   mysql -u root -p < db/setup.sql
   ```

4. Create a `.env` file in the backend directory with the following content (modify as needed):
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=eureka_blogs
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (if needed):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

### Option 3: Docker Setup

If you prefer using Docker and have Docker and Docker Compose installed:

1. Simply run:
   ```bash
   docker-compose up
   ```

2. This will set up the MySQL database, backend API, and frontend application in separate containers.

## Accessing the Application

Once both the frontend and backend servers are running:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Accounts

You can use these demo accounts to test the application:

- Admin User:
  - Email: admin@eureka-blogs.com
  - Password: admin123

- Regular User:
  - Email: user@example.com
  - Password: user123

## Deployment

The application can be deployed on platforms like Vercel, Netlify, or Render:

1. Frontend: Deploy the React app on Vercel or Netlify
2. Backend: Deploy the Node.js server on Render or a similar service
3. Database: Set up a managed MySQL database service or host your own

## API Endpoints

### Auth Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get current user profile
- PUT `/api/auth/profile` - Update user profile
- PATCH `/api/auth/change-password` - Change password

### Blog Endpoints

- GET `/api/blogs` - Get all blogs
- GET `/api/blogs/:identifier` - Get a single blog by ID or slug
- POST `/api/blogs` - Create a new blog (requires authentication)
- PUT `/api/blogs/:id` - Update a blog (requires authentication)
- DELETE `/api/blogs/:id` - Delete a blog (requires authentication)
- GET `/api/blogs/category/:category` - Get blogs by category
- GET `/api/blogs/author/:authorId` - Get blogs by author
