# Phitik.com

A minimal proxy development server built with React.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## ⚙️ Configuration

Copy `.env.example` to `.env` and configure your settings:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Social Media Links
REACT_APP_GITHUB_URL=https://github.com/yourusername
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourprofile

# Site Configuration
REACT_APP_SITE_TITLE=Your Site Title
REACT_APP_SITE_DESCRIPTION=Your site description
```

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t phitik-app .

# Run the container
docker run -p 3000:3000 phitik-app

# Run with environment variables
docker run -p 3000:3000 \
  -e REACT_APP_GITHUB_URL=https://github.com/yourusername \
  -e REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourprofile \
  -e REACT_APP_SITE_TITLE="My Custom Title" \
  phitik-app
```

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  phitik-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_GITHUB_URL=https://github.com/yourusername
      - REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

Then run:
```bash
docker-compose up -d
```

## 🌐 Other Deployment Options

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `REACT_APP_GITHUB_URL`
   - `REACT_APP_LINKEDIN_URL`
   - `REACT_APP_SITE_TITLE`
   - `REACT_APP_SITE_DESCRIPTION`
3. Deploy automatically on push

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### GitHub Pages
1. Run `npm run build`
2. Deploy the `build` folder to GitHub Pages

## 📁 Project Structure

```
src/
├── App.js          # Main component
├── App.css         # Styles
├── config.js       # Configuration management
└── index.js        # Entry point
```

## 🔧 Environment Variables

All environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

- `REACT_APP_GITHUB_URL` - Your GitHub profile URL
- `REACT_APP_LINKEDIN_URL` - Your LinkedIn profile URL  
- `REACT_APP_SITE_TITLE` - Site title (default: "Phitik.com")
- `REACT_APP_SITE_DESCRIPTION` - Site description (default: "Development proxy server")

## 📄 License

MIT License