// Configuration file for social media links and site settings
const config = {
  site: {
    title: process.env.REACT_APP_SITE_TITLE || 'Phitik.com',
    name: process.env.REACT_APP_SITE_NAME || 'Jedsadaporn Pannok',
    subtitle: process.env.REACT_APP_SITE_SUBTITLE || 'Developer & Creator',
    bio: process.env.REACT_APP_SITE_BIO || 'Building digital experiences and exploring new technologies'
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
