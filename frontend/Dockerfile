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
