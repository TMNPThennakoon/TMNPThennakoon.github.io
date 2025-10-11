import React, { useEffect, useRef } from 'react';

const TechnicalSkills = () => {
  const skillsRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

    if (skillsRef.current) {
      sectionObserver.observe(skillsRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  const technicalSkills = [
    { name: 'Java', icon: 'fa-brands fa-java', color: '#f89820' },
    { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
    { name: 'JavaScript', icon: 'fa-brands fa-js-square', color: '#f7df1e' },
    { name: 'React', icon: 'fa-brands fa-react', color: '#61dafb' },
    { name: 'HTML', icon: 'fa-brands fa-html5', color: '#e34f26' },
    { name: 'CSS', icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
    { name: 'PHP', icon: 'fa-brands fa-php', color: '#777bb4' },
    { name: 'SQL', icon: 'fa-solid fa-database', color: '#336791' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#f05032' },
    { name: 'GitHub', icon: 'fa-brands fa-github', color: '#333' },
    { name: 'Firebase', icon: 'fa-solid fa-fire', color: '#ffca28' },
    { name: 'AWS', icon: 'fa-brands fa-aws', color: '#ff9900' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ed' },
    { name: 'Linux', icon: 'fa-brands fa-linux', color: '#fcc624' },
    { name: 'Arduino', icon: 'fa-solid fa-microchip', color: '#00979d' },
    { name: 'Raspberry Pi', icon: 'fa-brands fa-raspberry-pi', color: '#c51a4a' },
    { name: 'LabVIEW', icon: 'fa-solid fa-wave-square', color: '#ff6b00' },
    { name: 'SolidWorks', icon: 'fa-solid fa-cube', color: '#ff6b35' },
    { name: 'Arduino IDE', icon: 'fa-solid fa-code', color: '#00979d' },
    { name: 'Microchip Studio', icon: 'fa-solid fa-microchip', color: '#00d4ff' },
    { name: 'Proteus', icon: 'fa-solid fa-diagram-project', color: '#8e44ad' },
    { name: 'AutoCAD', icon: 'fa-solid fa-drafting-compass', color: '#d2001f' },
    { name: 'Octave', icon: 'fa-solid fa-calculator', color: '#0790c0' },
    { name: 'PLC', icon: 'fa-solid fa-cogs', color: '#00d4ff' },
    { name: 'IoT', icon: 'fa-solid fa-wifi', color: '#00ff88' },
    { name: 'Machine Learning', icon: 'fa-solid fa-brain', color: '#ff6b6b' },
    { name: 'UI/UX', icon: 'fa-solid fa-palette', color: '#9c27b0' }
  ];

  return (
    <section className="technical-skills" id="technical-skills" ref={skillsRef}>
      <h2 className="heading">Technical <span>Skills</span></h2>
      <p className="section-subtitle">Technologies and tools I work with</p>
      
      <div className="skills-scroll-container" ref={scrollContainerRef}>
        <div className="skills-scroll-wrapper">
          {technicalSkills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                <i className={skill.icon}></i>
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {technicalSkills.map((skill, index) => (
            <div key={`duplicate-${index}`} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                <i className={skill.icon}></i>
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
