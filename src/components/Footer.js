import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nayana Pabasara</h3>
          <p>Engineering Technology Student | Automation & Web Development Enthusiast</p>
          <p>Passionate about creating innovative solutions that make a difference in the world.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/napi-9046392b3/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/nayanapabasara" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="mailto:nayanapabasara1@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Nayana Pabasara. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
