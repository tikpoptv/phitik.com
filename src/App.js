import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';
import config from './config';

function App() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const portfolioSectionRef = useRef(null);
  const heroSectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Load portfolio data from JSON file
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const response = await fetch('/portfolio.json');
        
        if (!response.ok) {
          throw new Error('Failed to load portfolio data');
        }
        
        const data = await response.json();
        
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setPortfolioItems(data.items);
        } else {
          setPortfolioItems([]);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setHasError(true);
        setPortfolioItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioData();
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
            
            <div className="brand">
              <span className="site-title">{config.site.title}</span>
              <div className="status-indicator"></div>
            </div>
            
            {config.site.subtitle && (
              <p className="subtitle">
                {config.site.subtitle}
              </p>
            )}
            
            {config.site.bio && (
              <p className="bio">
                {config.site.bio}
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
          
          {isLoading ? (
            <div className="portfolio-empty">
              <p className="portfolio-empty-text">Loading...</p>
            </div>
          ) : hasError || portfolioItems.length === 0 ? (
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
                  {item.link && (
                    <a href={item.link} className="portfolio-link" target="_blank" rel="noopener noreferrer">
                      View more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
