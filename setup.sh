#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}          Eureka Blogs - Setup Script         ${NC}"
echo -e "${BLUE}===============================================${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Function to handle error
handle_error() {
    echo -e "${RED}An error occurred. Setup failed.${NC}"
    exit 1
}

# Set up trap for error handling
trap 'handle_error' ERR

echo -e "${YELLOW}Starting Docker containers...${NC}"
docker-compose up -d

echo -e "${GREEN}Waiting for services to start...${NC}"
sleep 10

echo -e "${BLUE}===============================================${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${BLUE}===============================================${NC}"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}Backend API:${NC} http://localhost:5000"
echo -e "${BLUE}===============================================${NC}"
echo -e "${YELLOW}Demo accounts:${NC}"
echo -e "Admin: admin@eureka-blogs.com / admin123"
echo -e "User: user@example.com / user123"
echo -e "${BLUE}===============================================${NC}"
echo -e "To stop the application, run: ${YELLOW}docker-compose down${NC}"
echo -e "${BLUE}===============================================${NC}"
