import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    closeMenu();
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-content">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <div className="logo-icon">
            <div className="crosshair">
              <div className="crosshair-center"></div>
              <div className="crosshair-dot crosshair-dot-1"></div>
              <div className="crosshair-dot crosshair-dot-2"></div>
              <div className="crosshair-dot crosshair-dot-3"></div>
              <div className="crosshair-dot crosshair-dot-4"></div>
            </div>
          </div>
          <div className="logo-text-container">
            <span className="logo-text">Nayana Pabasara</span>
            <span className="logo-title">Automation Engineer</span>
          </div>
        </a>
        
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </a>
          
          <div className="dropdown">
            <a 
              href="#about" 
              className={`dropdown-toggle ${activeSection === 'about' || activeSection === 'experience' || activeSection === 'education' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              <i className="fa-solid fa-user"></i>
              <span>About</span>
              <i className="fa-solid fa-chevron-down"></i>
            </a>
            <div className="dropdown-menu">
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                <i className="fa-solid fa-user"></i>
                <span>About</span>
              </a>
              <a 
                href="#experience" 
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
              >
                <i className="fa-solid fa-briefcase"></i>
                <span>Experience</span>
              </a>
              <a 
                href="#education" 
                className={activeSection === 'education' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}
              >
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Education</span>
              </a>
            </div>
          </div>
          
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
          >
            <i className="fa-solid fa-microchip"></i>
            <span>Skills</span>
          </a>
          
          <a 
            href="#services" 
            className={activeSection === 'services' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
          >
            <i className="fa-solid fa-cogs"></i>
            <span>Services</span>
          </a>
          
          <a 
            href="#portfolio" 
            className={activeSection === 'portfolio' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
          >
            <i className="fa-solid fa-folder-open"></i>
            <span>Projects</span>
          </a>
        </nav>
      </div>
      <i 
        className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} 
        id="menu-icon"
        onClick={toggleMenu}
      ></i>
    </header>
  );
};

export default Header;

