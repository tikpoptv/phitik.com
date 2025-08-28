# Phitik.com

A minimal personal portfolio website built with React.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Production build and run on port 3002
docker compose up -d phitik-app

# Development mode with hot reload on port 3001
docker compose --profile dev up phitik-dev

# Stop services
docker compose down
```

### Using Docker directly

```bash
# Build the Docker image
docker build -t phitik-app .

# Run the container on port 3002
docker run -p 3002:3000 phitik-app

# Run with custom environment variables
docker build \
  --build-arg REACT_APP_SITE_TITLE="My Portfolio" \
  --build-arg REACT_APP_GITHUB_URL="https://github.com/yourusername" \
  -t phitik-app .
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Site Configuration
REACT_APP_SITE_TITLE=Phitik.com
REACT_APP_SITE_DESCRIPTION=Personal portfolio and development server

# Social Media Links
REACT_APP_GITHUB_URL=https://github.com/yourusername
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

All environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

## 🌐 Deployment Options

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker-based Hosting
- Railway
- DigitalOcean App Platform
- AWS Container Services
- Google Cloud Run

## 📁 Project Structure

```
src/
├── App.js          # Main component
├── App.css         # Styles
├── config.js       # Configuration management
└── index.js        # Entry point
```

## 🛠️ Available Environment Variables

- `REACT_APP_SITE_TITLE` - Site title (default: "Phitik.com")
- `REACT_APP_SITE_DESCRIPTION` - Site description (default: "Personal portfolio and development server")
- `REACT_APP_GITHUB_URL` - Your GitHub profile URL
- `REACT_APP_LINKEDIN_URL` - Your LinkedIn profile URL

## 🏗️ Architecture

- **Multi-stage Dockerfile** for optimized production builds
- **Development and Production** environments in Docker Compose
- **Environment variable support** at build time
- **Static file serving** with serve package

## 📄 License

MIT License