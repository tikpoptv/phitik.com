# Development stage
FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public/ ./public/
COPY src/ ./src/
EXPOSE 3000
CMD ["npm", "start"]

# Production build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY public/ ./public/
COPY src/ ./src/

# Accept build arguments for environment variables
ARG REACT_APP_SITE_TITLE="Phitik.com"
ARG REACT_APP_SITE_DESCRIPTION="Personal portfolio and development server"
ARG REACT_APP_GITHUB_URL="https://github.com/yourusername"
ARG REACT_APP_LINKEDIN_URL="https://linkedin.com/in/yourprofile"

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine as production
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
