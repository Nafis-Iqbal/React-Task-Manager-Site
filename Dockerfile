# Use the official Node.js image to build the React app
FROM node:16

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies (including React, Axios, etc.)
RUN npm install

# Copy the rest of the React project files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 (React default port)
EXPOSE 3000

# Start the React development server (or serve production build)
CMD ["npm", "start"]
