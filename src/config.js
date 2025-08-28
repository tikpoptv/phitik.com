// Configuration file for social media links and site settings
const config = {
  site: {
    title: process.env.REACT_APP_SITE_TITLE || 'Phitik.com',
    description: process.env.REACT_APP_SITE_DESCRIPTION || 'Development proxy server'
  },
  socialLinks: {
    github: process.env.REACT_APP_GITHUB_URL || 'https://github.com',
    linkedin: process.env.REACT_APP_LINKEDIN_URL || 'https://linkedin.com'
  },
  // Environment info
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 App Configuration:', {
    environment: process.env.NODE_ENV,
    githubUrl: config.socialLinks.github,
    linkedinUrl: config.socialLinks.linkedin
  });
}

export default config;
