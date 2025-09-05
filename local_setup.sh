#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}       Eureka Blogs - Local Development Setup    ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Check if Node.js is installed
echo -e "\n${YELLOW}Checking for Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}Node.js is installed (${NODE_VERSION})${NC}"
else
    echo -e "${RED}Node.js is not installed. Please install Node.js before proceeding.${NC}"
    exit 1
fi

# Check if npm is installed
echo -e "\n${YELLOW}Checking for npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}npm is installed (v${NPM_VERSION})${NC}"
else
    echo -e "${RED}npm is not installed. Please install npm before proceeding.${NC}"
    exit 1
fi

# Create .env files
echo -e "\n${YELLOW}Creating environment files...${NC}"

# Backend .env file
if [ ! -f ./backend/.env ]; then
    echo -e "${BLUE}Creating backend .env file${NC}"
    cat > ./backend/.env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=eureka_blogs
JWT_SECRET=your_jwt_secret_key
EOF
    echo -e "${GREEN}Backend .env file created!${NC}"
else
    echo -e "${YELLOW}Backend .env file already exists. Skipping.${NC}"
fi

# Install backend dependencies
echo -e "\n${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..
echo -e "${GREEN}Backend dependencies installed!${NC}"

# Install frontend dependencies
echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}Frontend dependencies installed!${NC}"

# Check if MySQL is installed
echo -e "\n${YELLOW}Checking for MySQL...${NC}"
if command -v mysql &> /dev/null; then
    echo -e "${GREEN}MySQL is installed${NC}"
    
    # Create the database and tables
    echo -e "\n${YELLOW}Setting up database (you may be prompted for MySQL root password)...${NC}"
    echo -e "${BLUE}Creating database and tables...${NC}"
    
    mysql -u root -p < ./backend/db/setup.sql
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Database setup completed successfully!${NC}"
    else
        echo -e "${RED}Database setup failed. You may need to manually import the setup.sql file.${NC}"
        echo -e "${YELLOW}Use: mysql -u root -p < ./backend/db/setup.sql${NC}"
    fi
else
    echo -e "${YELLOW}MySQL is not installed or not in PATH.${NC}"
    echo -e "${YELLOW}You will need to manually set up the database using the setup.sql script:${NC}"
    echo -e "${YELLOW}mysql -u root -p < ./backend/db/setup.sql${NC}"
fi

# Start backend and frontend in separate terminals
echo -e "\n${BLUE}=================================================${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${BLUE}=================================================${NC}"

# Ask user if they want to start the servers
echo -e "\n${YELLOW}Do you want to start the servers now? (y/n)${NC}"
read -r START_SERVERS

if [[ $START_SERVERS =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}Starting backend server...${NC}"
    gnome-terminal -- bash -c "cd backend && npm run dev; exec bash" 2>/dev/null || xterm -e "cd backend && npm run dev" 2>/dev/null || konsole -e "cd backend && npm run dev" 2>/dev/null || terminal -e "cd backend && npm run dev" 2>/dev/null || echo -e "${RED}Could not open a new terminal window. Please start the servers manually.${NC}"
    
    sleep 2
    
    echo -e "\n${YELLOW}Starting frontend server...${NC}"
    gnome-terminal -- bash -c "cd frontend && npm start; exec bash" 2>/dev/null || xterm -e "cd frontend && npm start" 2>/dev/null || konsole -e "cd frontend && npm start" 2>/dev/null || terminal -e "cd frontend && npm start" 2>/dev/null || echo -e "${RED}Could not open a new terminal window. Please start the servers manually.${NC}"
    
    echo -e "\n${GREEN}Servers started! The application should open in your browser shortly.${NC}"
else
    echo -e "\n${YELLOW}To start the backend server:${NC}"
    echo -e "cd backend && npm run dev"
    echo -e "\n${YELLOW}To start the frontend development server:${NC}"
    echo -e "cd frontend && npm start"
fi

echo -e "\n${YELLOW}Access the application at:${NC}"
echo -e "Frontend: http://localhost:3000"
echo -e "Backend API: http://localhost:5000"
echo -e "\n${YELLOW}Demo accounts:${NC}"
echo -e "Admin: admin@eureka-blogs.com / admin123"
echo -e "User: user@example.com / user123"
echo -e "\n${BLUE}=================================================${NC}"
