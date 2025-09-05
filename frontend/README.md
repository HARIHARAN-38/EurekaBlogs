# Eureka Blogs Frontend

This is the frontend application for Eureka Blogs.

## Deployment on Vercel

### Automatic Deployment

The easiest way to deploy this frontend is with Vercel. Just connect your GitHub repository to Vercel and it will automatically detect the React application and deploy it.

1. Sign up for a Vercel account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure the following environment variables in Vercel:
   - `REACT_APP_API_URL`: Your API URL (e.g., https://eureka-blogs-api.herokuapp.com)
4. Deploy!

### Manual Deployment

1. Build the project locally:
   ```bash
   npm run build
   ```
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy the build folder:
   ```bash
   vercel deploy --prod
   ```

## Environment Variables

- `REACT_APP_API_URL`: URL of the backend API

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the application in development mode.
