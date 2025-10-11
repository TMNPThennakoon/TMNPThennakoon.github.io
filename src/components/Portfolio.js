import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const portfolioRef = useRef(null);

  const projects = [
    {
      id: 1,
      category: 'mobile',
      title: 'Serandib Stay - Hotel Management System',
      description: 'Comprehensive hotel booking app with transport booking, food ordering, and Sri Lanka\'s most beautiful places tracking features.',
      image: 'hotel.png',
      tech: ['Flutter', 'Firebase', 'Google Maps', 'Payment Gateway'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'December 2024',
      categoryLabel: 'MOBILE APPLICATION'
    },
    {
      id: 2,
      category: 'mobile',
      title: 'GPA Calculator App',
      description: 'University GPA calculator for Sri Lankan students with subject management, credit calculation, and semester-wise GPA tracking.',
      image: 'gpa.jpg',
      tech: ['Flutter', 'Dart', 'SQLite', 'Material Design'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'October 2024',
      categoryLabel: 'MOBILE APPLICATION'
    },
    {
      id: 3,
      category: 'web',
      title: 'E-Commerce Web Application',
      description: 'Full-stack e-commerce platform with user authentication, product management, shopping cart, and secure payment integration.',
      image: 'e-mart.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'August 2024',
      categoryLabel: 'WEB APPLICATION'
    },
    {
      id: 4,
      category: 'automation',
      title: 'Pneumatic Product Sorting System',
      description: 'Automated sorting system using Siemens PLC with 3 conveyor belts, 7 sensors, and pneumatic actuators for product detection and sorting.',
      image: 'pneumatic-sorting.jpg',
      tech: ['Siemens PLC', 'TIA Portal', 'Ladder Logic', 'HMI'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'June 2024',
      categoryLabel: 'QA AUTOMATION'
    },
    {
      id: 5,
      category: 'automation',
      title: 'Smart 3-Level Elevator Prototype',
      description: 'Elevator control system using S7-200 PLC with three floors, door interlocks, call prioritization, and queue-based scheduling for optimal performance.',
      image: 'elevator-system.jpg',
      tech: ['S7-200 PLC', 'Ladder Logic', 'Safety Systems', 'SCADA'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'April 2024',
      categoryLabel: 'QA AUTOMATION'
    },
    {
      id: 6,
      category: 'iot',
      title: 'Smart Greenhouse Monitoring System',
      description: 'IoT-based greenhouse monitoring with real-time environmental data collection, automated control systems, and sensor integration.',
      image: 'SG.jpg',
      tech: ['Arduino', 'Python', 'MQTT', 'Raspberry Pi'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'February 2024',
      categoryLabel: 'MOBILE APPLICATION'
    },
    {
      id: 7,
      category: 'ml',
      title: 'Sign Language Detection System',
      description: 'Real-time sign language recognition system with 90%+ accuracy supporting all 26 English letters and 10 numbers. Features advanced computer vision, modern GUI interface, and smart machine learning using Random Forest classifier.',
      image: 'm1.png',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn', 'Tkinter'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'January 2024',
      categoryLabel: 'MACHINE LEARNING'
    },
    {
      id: 8,
      category: 'ml',
      title: 'Face and Eye Recognizer',
      description: 'Advanced computer vision system for real-time face and eye detection using MediaPipe. Features precise facial landmark detection and eye tracking capabilities for various applications.',
      image: 'm2.png',
      tech: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'Computer Vision'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'December 2023',
      categoryLabel: 'MACHINE LEARNING'
    },
    {
      id: 9,
      category: 'ml',
      title: 'Real-Time Sign Language Recognition',
      description: 'Deep learning-based ASL recognition system for 10 common gestures using MediaPipe hand landmarks and CNN. Achieves 99.37% accuracy on balanced, augmented dataset for inclusive HCI and accessibility.',
      image: 'm3.png',
      tech: ['Python', 'MediaPipe', 'Deep Learning', 'CNN', 'TensorFlow'],
      github: 'https://github.com/nayanapabasara',
      live: '#',
      date: 'November 2023',
      categoryLabel: 'MACHINE LEARNING'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Applications' },
    { key: 'ml', label: 'Machine Learning' },
    { key: 'automation', label: 'QA Automation' },
    { key: 'iot', label: 'IoT Systems' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (portfolioRef.current) {
      sectionObserver.observe(portfolioRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="portfolio" id="portfolio" ref={portfolioRef}>
      <h2 className="heading">Featured <span>Projects</span></h2>
      <p className="section-subtitle">Innovative solutions and engineering projects</p>
      
      <div className="portfolio-filters">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="portfolio-container">
        {filteredProjects.map(project => (
          <div key={project.id} className="portfolio-box" data-category={project.category}>
            <div className="portfolio-image-container">
              <img src={project.image} alt={project.title} />
              <div className="portfolio-category-tag">
                {project.categoryLabel}
              </div>
            </div>
            <div className="portfolio-content">
              <h4 className="portfolio-title">{project.title}</h4>
              <p className="portfolio-date">{project.date}</p>
              <p className="portfolio-description">{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="portfolio-actions">
                {project.live !== '#' && (
                  <a 
                    href={project.live} 
                    className="btn btn-live" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-external-link-alt"></i>
                    LIVE
                  </a>
                )}
                <a 
                  href={project.github} 
                  className="btn btn-code" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i>
                  CODE
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
