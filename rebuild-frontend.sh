#!/bin/bash
echo "Stopping Docker containers..."
docker-compose down

echo "Creating a fresh Dockerfile for frontend..."
cat > frontend/Dockerfile << 'DOCKERFILE'
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Create and give permissions to the .cache directory
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

# Clear any potential cached files
RUN npm cache clean --force

COPY . .

CMD ["npm", "start"]
DOCKERFILE

echo "Rebuilding frontend container..."
docker-compose build frontend

echo "Starting containers..."
docker-compose up -d

echo "Waiting for frontend to start..."
sleep 20

echo "Checking frontend status..."
curl -I http://localhost:3000
