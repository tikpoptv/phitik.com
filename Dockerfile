FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY public/ ./public/
COPY src/ ./src/

# Accept build arguments (for build-time environment variables)
ARG REACT_APP_SITE_TITLE="Phitik.com"
ARG REACT_APP_SITE_DESCRIPTION="Development proxy server"
ARG REACT_APP_GITHUB_URL="https://github.com"
ARG REACT_APP_LINKEDIN_URL="https://linkedin.com"

# Build the app (CRA will use ARG values automatically)
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
