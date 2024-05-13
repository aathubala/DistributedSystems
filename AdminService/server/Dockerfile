# Use the official Node.js 14 image as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8080 (or the port your Node.js application is listening on)
EXPOSE 8080

# Command to run your Node.js application
CMD ["npm", "run","dev"]
