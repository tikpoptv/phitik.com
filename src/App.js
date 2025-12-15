import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTrophy, FaBriefcase, FaGraduationCap, FaCode, FaLaptopCode, FaGlobe, FaServer, FaDatabase, FaTools, FaBrain, FaInfoCircle } from 'react-icons/fa';
import { SiPython, SiGo, SiC, SiCplusplus, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiAstro, SiVite, SiSpring, SiExpress, SiNodedotjs, SiPostgresql, SiMongodb, SiMinio, SiAmazonwebservices, SiCloudflare, SiDocker, SiJenkins, SiGithubactions, SiGit, SiTensorflow, SiPytorch } from 'react-icons/si';
import { Icon } from '@iconify/react';
import './App.css';
import config from './config';

function App() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [skillsCategories, setSkillsCategories] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [educationItems, setEducationItems] = useState([]);
  const [awardItems, setAwardItems] = useState([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [portfolioError, setPortfolioError] = useState(false);
  const [proxyStatus, setProxyStatus] = useState(null); // null = checking, true = online, false = offline
  const [selectedItem, setSelectedItem] = useState(null); // For modal
  const portfolioSectionRef = useRef(null);
  const heroSectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Icon mapping for categories
  const iconMap = {
    FaLaptopCode,
    FaGlobe,
    FaServer,
    FaDatabase,
    FaTools,
    FaBrain
  };

  // Wrapper components for Iconify icons
  const IconifyIcon = ({ icon, className }) => (
    <Icon icon={icon} className={className} />
  );

  // Icon mapping for skills
  const skillIconMap = {
    'Python': SiPython,
    'Java': (props) => <IconifyIcon icon="logos:java" {...props} />,
    'Go': SiGo,
    'C': SiC,
    'C++': SiCplusplus,
    'C#': (props) => <IconifyIcon icon="logos:c-sharp" {...props} />,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'React.js': SiReact,
    'Next.js': SiNextdotjs,
    'Tailwind CSS': SiTailwindcss,
    'Astro': SiAstro,
    'Vite': SiVite,
    'Spring Boot': SiSpring,
    'Express.js': SiExpress,
    'Go (Golang)': SiGo,
    'Node.js': SiNodedotjs,
    'SQL': SiPostgresql,
    'MongoDB': SiMongodb,
    'MinIO': SiMinio,
    'AWS': SiAmazonwebservices,
    'Azure': (props) => <IconifyIcon icon="logos:azure" {...props} />,
    'Cloudflare Pages': SiCloudflare,
    'Docker': SiDocker,
    'Jenkins': SiJenkins,
    'GitHub Actions': SiGithubactions,
    'Git': SiGit,
    'GitHub': FaGithub,
    'TensorFlow': SiTensorflow,
    'PyTorch': SiPytorch
  };

  // Load all data from JSON files
  useEffect(() => {
    const loadAllData = async () => {
      // Load portfolio data
      try {
        setIsPortfolioLoading(true);
        setPortfolioError(false);
        const portfolioResponse = await fetch('/portfolio.json');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setPortfolioItems(portfolioData.items || []);
        } else {
          setPortfolioError(true);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setPortfolioError(true);
      } finally {
        setIsPortfolioLoading(false);
      }
      
      // Load skills data
      try {
        const skillsResponse = await fetch('/skills.json');
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkillsCategories(skillsData.categories || []);
        }
      } catch (error) {
        console.error('Error loading skills data:', error);
      }
      
      // Load experience data
      try {
        const experienceResponse = await fetch('/experience.json');
        if (experienceResponse.ok) {
          const experienceData = await experienceResponse.json();
          setExperienceItems(experienceData.items || []);
        }
      } catch (error) {
        console.error('Error loading experience data:', error);
      }
      
      // Load education data
      try {
        const educationResponse = await fetch('/education.json');
        if (educationResponse.ok) {
          const educationData = await educationResponse.json();
          setEducationItems(educationData.items || []);
        }
      } catch (error) {
        console.error('Error loading education data:', error);
      }
      
      // Load awards data
      try {
        const awardsResponse = await fetch('/awards.json');
        if (awardsResponse.ok) {
          const awardsData = await awardsResponse.json();
          setAwardItems(awardsData.items || []);
        }
      } catch (error) {
        console.error('Error loading awards data:', error);
      }
    };

    loadAllData();
  }, []);

  // Check proxy status
  useEffect(() => {
    const checkProxyStatus = async () => {
      try {
        // Use image loading to check if proxy is accessible
        // This works even with CORS restrictions
        const img = new Image();
        let statusChecked = false;
        
        const timeoutId = setTimeout(() => {
          if (!statusChecked) {
            statusChecked = true;
            setProxyStatus(false);
          }
        }, 5000); // 5 second timeout
        
        img.onload = () => {
          if (!statusChecked) {
            statusChecked = true;
            clearTimeout(timeoutId);
            setProxyStatus(true);
          }
        };
        
        img.onerror = () => {
          if (!statusChecked) {
            statusChecked = true;
            clearTimeout(timeoutId);
            setProxyStatus(false);
          }
        };
        
        // Try to load favicon or any small resource
        img.src = `${config.proxy.url}/favicon.ico?t=${Date.now()}`;
      } catch (error) {
        console.error('Error checking proxy status:', error);
        setProxyStatus(false);
      }
    };

    // Initial check
    checkProxyStatus();

    // Check periodically
    const intervalId = setInterval(checkProxyStatus, config.proxy.checkInterval);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    if (portfolioItems.length === 0) return;
    
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 150); // Stagger delay
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [portfolioItems]);

  // Handle scroll event
  useEffect(() => {
    let scrollTimeout;
    let lastScrollTop = 0;
    let isScrollingDown = false;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Detect scroll direction
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down
        if (!isScrollingDown && !isScrolling) {
          isScrollingDown = true;
          setIsScrolling(true);
          setShowScrollHint(false);
          
          // Smooth scroll to portfolio section
          if (portfolioSectionRef.current) {
            portfolioSectionRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          
          // Reset scrolling state after animation
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
            isScrollingDown = false;
          }, 1000);
        }
      } else if (currentScrollTop < lastScrollTop && currentScrollTop < 50) {
        // Scrolling up near top
        setShowScrollHint(true);
        isScrollingDown = false;
      }
      
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  return (
    <div className="app-wrapper">
      <section ref={heroSectionRef} className="hero-section">
        <div className="container">
          <main className="main">
            {config.site.name && (
              <h1 className="name">
                {config.site.name}
              </h1>
            )}
            
            <div className="brand-container">
              <div className="brand">
                <span className="site-title">{config.site.title}</span>
                <div className={`status-indicator ${proxyStatus === true ? 'status-online' : proxyStatus === false ? 'status-offline' : 'status-checking'}`}></div>
              </div>
              
              {proxyStatus === false && (
                <div className="proxy-status">
                  <span className="proxy-status-label">Proxy:</span>
                  <span className="proxy-status-text status-offline-text">
                    Offline
                  </span>
                </div>
              )}
            </div>
            
            {config.site.subtitle && (
              <p className="subtitle">
                {config.site.subtitle}
              </p>
            )}
            
            <nav className="links">
              <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="link">
                <FaGithub className="link-icon" />
                <span>GitHub</span>
              </a>
              <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                <FaLinkedin className="link-icon" />
                <span>LinkedIn</span>
              </a>
            </nav>
          </main>
          
          {showScrollHint && (
            <div className="scroll-hint">
              <span className="scroll-hint-text">Scroll to view portfolio</span>
              <div className="scroll-hint-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={portfolioSectionRef} className="portfolio-section">
        <div className="container">
          <h2 className="portfolio-title">Portfolio</h2>
          
          {config.site.bio && (
            <p className="portfolio-bio">
              {config.site.bio}
            </p>
          )}
          
          {isPortfolioLoading ? (
            <div className="portfolio-empty">
              <p className="portfolio-empty-text">Loading...</p>
            </div>
          ) : portfolioError || portfolioItems.length === 0 ? (
            <div className="portfolio-empty">
              <p className="portfolio-empty-title">No portfolio items found</p>
              <p className="portfolio-empty-text">
                Portfolio data is currently unavailable. Please check back soon for updates.
              </p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {portfolioItems.map((item, index) => (
                <div 
                  key={item.id} 
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`portfolio-card ${visibleCards.has(index) ? 'card-visible' : ''}`}
                  style={{ '--card-index': index }}
                >
                  <h3 className="portfolio-card-title">{item.title}</h3>
                  <p className="portfolio-card-description">{item.description}</p>
                  <div className="portfolio-tags">
                    {item.tags && item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="portfolio-tag">{tag}</span>
                    ))}
                  </div>
                  {(item.github || item.website || item.more) && (
                    <div className="portfolio-links">
                      {item.github && (
                        <a href={item.github} className="portfolio-link portfolio-link-github" target="_blank" rel="noopener noreferrer">
                          <FaGithub className="portfolio-link-icon" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {item.website && (
                        <a href={item.website} className="portfolio-link portfolio-link-website" target="_blank" rel="noopener noreferrer">
                          <FaGlobe className="portfolio-link-icon" />
                          <span>Website</span>
                        </a>
                      )}
                      {item.more && (
                        <button 
                          onClick={() => setSelectedItem(item)} 
                          className="portfolio-link portfolio-link-more"
                        >
                          <FaInfoCircle className="portfolio-link-icon" />
                          <span>More</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">
            <FaCode className="section-icon" />
            Skills & Proficiencies
          </h2>
          <div className="skills-grid">
            {skillsCategories.map((category) => {
              const IconComponent = iconMap[category.icon];
              return (
                <div key={category.id} className="skill-category">
                  <h3 className="skill-category-title">
                    {IconComponent && <IconComponent className="skill-category-icon" />}
                    {category.name}
                  </h3>
                  <div className="skill-tags">
                    {category.skills.map((skill, index) => {
                      const SkillIcon = skillIconMap[skill];
                      return (
                        <span key={index} className="skill-tag">
                          {SkillIcon && <SkillIcon className="skill-tag-icon" />}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">
            <FaBriefcase className="section-icon" />
            Experience
          </h2>
          <div className="experience-list">
            {experienceItems.map((item) => (
              <div key={item.id} className="experience-item">
                <div className="experience-header">
                  <h3 className="experience-title">{item.title}</h3>
                  <span className="experience-company">{item.company}</span>
                  <span className="experience-period">{item.period} · {item.location}</span>
                </div>
                <ul className="experience-details">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <h2 className="section-title">
            <FaGraduationCap className="section-icon" />
            Education
          </h2>
          {educationItems.map((item) => (
            <div key={item.id} className="education-item">
              <h3 className="education-degree">{item.degree}</h3>
              <p className="education-school">{item.school}</p>
              <p className="education-location">{item.location}</p>
              <p className="education-period">{item.period} · GPAX: {item.gpa}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <h2 className="section-title">
            <FaTrophy className="section-icon" />
            Competitions & Awards
          </h2>
          <div className="awards-list">
            {awardItems.map((item) => (
              <div key={item.id} className="award-item">
                <h3 className="award-title">{item.title}</h3>
                <p className="award-role">{item.role}</p>
                <p className="award-period">{item.period}</p>
                <p className="award-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for More Details */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <h2 className="modal-title">{selectedItem.title}</h2>
            <div className="modal-body">
              <p className="modal-description">{selectedItem.description}</p>
              {selectedItem.more && (
                <div className="modal-more">
                  {typeof selectedItem.more === 'string' ? (
                    <p>{selectedItem.more}</p>
                  ) : (
                    <>
                      {selectedItem.more.title && <h3>{selectedItem.more.title}</h3>}
                      {selectedItem.more.content && (
                        <div className="modal-more-content">
                          {Array.isArray(selectedItem.more.content) ? (
                            <ul>
                              {selectedItem.more.content.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{selectedItem.more.content}</p>
                          )}
                        </div>
                      )}
                      {selectedItem.more.features && (
                        <div className="modal-features">
                          <h4>Key Features:</h4>
                          <ul>
                            {selectedItem.more.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedItem.more.technologies && (
                        <div className="modal-technologies">
                          <h4>Technologies Used:</h4>
                          <div className="modal-tech-tags">
                            {selectedItem.more.technologies.map((tech, index) => (
                              <span key={index} className="modal-tech-tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {selectedItem.tags && (
                <div className="modal-tags">
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className="modal-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedItem.github && (
                <a href={selectedItem.github} className="modal-link modal-link-github" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="modal-link-icon" />
                  <span>View on GitHub</span>
                </a>
              )}
              {selectedItem.website && (
                <a href={selectedItem.website} className="modal-link modal-link-website" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="modal-link-icon" />
                  <span>Visit Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
