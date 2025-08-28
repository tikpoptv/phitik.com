import './App.css';
import config from './config';

function App() {
  return (
    <div className="container">
      <main className="main">
        <div className="brand">
          <h1>{config.site.title}</h1>
          <div className="status-indicator"></div>
        </div>
        
        <p className="description">
          {config.site.description}
        </p>
        
        <p className="notice">
          This service is for development purposes only
        </p>
        
        <nav className="links">
          <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
          <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
        </nav>
      </main>
    </div>
  );
}

export default App;
