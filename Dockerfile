# Use the official Node.js image as the base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container image
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

# Copy .env file
COPY .env .env

# Expose the port your app runs on
EXPOSE 1111

# Run the web service on container startup
CMD [ "node", "dist/index.js" ]
