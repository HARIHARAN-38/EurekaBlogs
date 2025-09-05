#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}       Eureka Blogs - Database Setup Script      ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Default MySQL credentials
DB_USER="root"
DB_HOST="localhost"

# Ask for MySQL credentials
echo -e "\n${YELLOW}Please enter your MySQL username (default: root):${NC}"
read -r INPUT_USER
if [ -n "$INPUT_USER" ]; then
    DB_USER=$INPUT_USER
fi

echo -e "${YELLOW}Please enter your MySQL password:${NC}"
read -rs DB_PASS

# Check MySQL connection
echo -e "\n${YELLOW}Testing MySQL connection...${NC}"
if mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -e "SELECT 1" >/dev/null 2>&1; then
    echo -e "${GREEN}MySQL connection successful!${NC}"
else
    echo -e "${RED}Failed to connect to MySQL. Please check your credentials and try again.${NC}"
    exit 1
fi

# Create database and import schema
echo -e "\n${YELLOW}Setting up database...${NC}"

# Create database if not exists
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS eureka_blogs;"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database 'eureka_blogs' created or already exists.${NC}"
else
    echo -e "${RED}Failed to create database. Exiting.${NC}"
    exit 1
fi

# Import schema from SQL file
echo -e "\n${YELLOW}Importing database schema and sample data...${NC}"
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" eureka_blogs < ./backend/db/setup.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database schema and sample data imported successfully!${NC}"
else
    echo -e "${RED}Failed to import database schema. Please check the SQL file and try again.${NC}"
    exit 1
fi

# Update backend .env file
echo -e "\n${YELLOW}Updating backend .env file with database credentials...${NC}"
if [ ! -f ./backend/.env ]; then
    cat > ./backend/.env << EOF
PORT=5000
DB_HOST=$DB_HOST
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASS
DB_NAME=eureka_blogs
JWT_SECRET=your_jwt_secret_key_$(date +%s)
EOF
    echo -e "${GREEN}Backend .env file created!${NC}"
else
    # Update existing .env file
    sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" ./backend/.env
    sed -i "s/DB_USER=.*/DB_USER=$DB_USER/" ./backend/.env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" ./backend/.env
    echo -e "${GREEN}Backend .env file updated!${NC}"
fi

echo -e "\n${BLUE}=================================================${NC}"
echo -e "${GREEN}Database setup completed successfully!${NC}"
echo -e "${BLUE}=================================================${NC}"
echo -e "\n${YELLOW}You can now run the application with:${NC}"
echo -e "npm start"
echo -e "\n${BLUE}=================================================${NC}"
