import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const words = [
    'Engineering Technology Student',
    'Web Developer',
    'App Developer',
    'Machine Learning Enthusiast',
    'PLC Automation Engineer',
    'IoT Developer',
    'UI/UX Designer',
    'Embedded Systems Engineer'
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 100 : 100;
    const waitTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      const current = words[currentWordIndex];
      
      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), waitTime);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(isDeleting 
          ? current.substring(0, currentText.length - 1)
          : current.substring(0, currentText.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

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
  };

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1>
          <span className="hello-text">Hello, I'm</span> 
          <span className="text-gradient">Nayana Pabasara</span>
        </h1>
        <h3 className="typing-text">
          <span className="txt">{currentText}</span>
        </h3>
        <p>Specializing in Instrumentation & Automation Technology with expertise in web development, machine learning, and innovative engineering solutions.</p>
        
        <div className="tech-stack">
          <span className="tech-item">Web Development</span>
          <span className="tech-item">Machine Learning</span>
          <span className="tech-item">App Development</span>
          <span className="tech-item">UI/UX Design</span>
          <span className="tech-item">FPGA Programming</span>
          <span className="tech-item">PLC Programming</span>
          <span className="tech-item">LabVIEW</span>
          <span className="tech-item">IoT Development</span>
          <span className="tech-item">Embedded Systems</span>
          <span className="tech-item">SolidWorks Design</span>
        </div>
        
        <div className="social-media">
          <a href="#"><i className="fa-brands fa-facebook"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/napi-9046392b3/"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/nayanapabasara" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
        </div>
        
        <div className="btn-group">
          <a 
            href="https://www.canva.com/design/DAGkKTADWIA/MJ_Lgp30GQFZgyya-XSr6w/view?utm_content=DAGkKTADWIA&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton" 
            className="btn btn-primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Download CV
          </a>
          <a 
            href="#portfolio" 
            className="btn btn-secondary"
            onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
          >
            View Portfolio
          </a>
        </div>
      </div>
      
      <div className="home-img">
        <div className="img-container">
          <img src="pro.png" alt="Nayana Pabasara" />
          <div className="floating-elements">
            <div className="floating-icon" data-tooltip="Mobile Apps">
              <i className="fa-solid fa-mobile-alt"></i>
            </div>
            <div className="floating-icon" data-tooltip="3D Design">
              <i className="fa-solid fa-cube"></i>
            </div>
            <div className="floating-icon" data-tooltip="UI/UX Design">
              <i className="fa-solid fa-palette"></i>
            </div>
            <div className="floating-icon" data-tooltip="PLC Automation">
              <i className="fa-solid fa-cogs"></i>
            </div>
            <div className="floating-icon" data-tooltip="Embedded Systems">
              <i className="fa-solid fa-microchip"></i>
            </div>
            <div className="floating-icon" data-tooltip="IoT Development">
              <i className="fa-solid fa-wifi"></i>
            </div>
            <div className="floating-icon engineer-icon" data-tooltip="Engineering">
              <div className="engineer-gear">
                <i className="fa-solid fa-cog"></i>
                <i className="fa-solid fa-wrench"></i>
                <i className="fa-solid fa-hammer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
