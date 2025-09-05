# Deploying Eureka Blogs to Vercel

This guide will walk you through deploying Eureka Blogs to Vercel with MongoDB integration.

## Prerequisites

- GitHub account
- Vercel account linked to your GitHub
- MongoDB Atlas account with a configured cluster

## Step 1: Set Up Your MongoDB Atlas Cluster

1. Create a MongoDB Atlas account if you don't have one already
2. Create a new cluster or use an existing one
3. Configure network access (Set IP access to 0.0.0.0/0 for Vercel deployment)
4. Create a database user with read/write permissions
5. Get your MongoDB connection string

## Step 2: Prepare Your Application for Deployment

Your application should already be updated with these changes:

- Frontend API calls use relative paths (REACT_APP_API_URL=/api)
- MongoDB models are used instead of MySQL models
- Vercel configuration file (vercel.json) exists at the root of your project

## Step 3: Deploy to Vercel

1. Push your code to GitHub
2. Log in to Vercel and click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run vercel-build
   - Output Directory: frontend/build

5. Add Environment Variables:
   - MONGODB_URI: your-mongodb-connection-string
   - JWT_SECRET: your-jwt-secret-key

6. Click "Deploy"

## Step 4: Verify Your Deployment

1. Wait for the deployment to complete
2. Visit your deployed site
3. Test user registration, login, and blog posting functionality

## Troubleshooting

### Connection Issues

If your application can't connect to MongoDB:

1. Check that the MONGODB_URI is correctly entered in Vercel
2. Ensure your MongoDB Atlas cluster has network access set to allow connections from anywhere (0.0.0.0/0)
3. Check your database user has the correct permissions

### Special Characters in Connection String

If your MongoDB connection string contains special characters:

1. Make sure they're properly encoded in the connection string
2. For @ symbol in passwords, it should be URL encoded as %40

### API Errors

If your frontend can't communicate with the backend:

1. Check that the API paths in the frontend are relative (/api/...)
2. Ensure the vercel.json configuration properly routes API requests to the backend

## Scaling and Monitoring

Once deployed, you can:

1. Monitor performance in Vercel dashboard
2. Set up monitoring in MongoDB Atlas
3. Configure automatic scaling in Vercel for production use
