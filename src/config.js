// Configuration file for social media links and site settings
const config = {
  site: {
    title: process.env.REACT_APP_SITE_TITLE || 'Phitik.com',
    name: process.env.REACT_APP_SITE_NAME || 'Supachok Deetaweesukh',
    nameTh: process.env.REACT_APP_SITE_NAME_TH || 'ศุภโชค ดีทวีสุข',
    previousName: process.env.REACT_APP_PREVIOUS_NAME || 'Jedsadaporn Pannok',
    previousNameTh: process.env.REACT_APP_PREVIOUS_NAME_TH || 'เจษฎาภรณ์ ปานนอก',
    subtitle: process.env.REACT_APP_SITE_SUBTITLE || 'Developer & Creator',
    bio: process.env.REACT_APP_SITE_BIO || 'Turning ideas into real, usable products from backend systems to user interfaces. Specializing in full-stack development, AI/ML, and scalable software solutions.'
  },
  socialLinks: {
    github: process.env.REACT_APP_GITHUB_URL || 'https://github.com/tikpoptv',
    linkedin: process.env.REACT_APP_LINKEDIN_URL || 'https://www.linkedin.com/in/jedsadaporn-pannok',
    website: process.env.REACT_APP_WEBSITE_URL || ''
  },
  proxy: {
    url: process.env.REACT_APP_PROXY_URL || 'https://home.ddns.phitik.com',
    statusCheckUrl: process.env.REACT_APP_PROXY_STATUS_CHECK_URL || '',
    checkInterval: process.env.REACT_APP_STATUS_CHECK_INTERVAL || 30000
  },
  status: {
    checkInterval: process.env.REACT_APP_STATUS_CHECK_INTERVAL || 30000
  },
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
