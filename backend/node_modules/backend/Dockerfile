# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port your backend uses (replace if different)
EXPOSE 3000

# Start the backend serverd
CMD ["npm", "start"]
