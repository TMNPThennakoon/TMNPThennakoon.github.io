import React, { useEffect, useRef } from 'react';

const Skills = () => {
  const skillsRef = useRef(null);

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

  return (
    <section className="skills" id="skills" ref={skillsRef}>
      <h2 className="heading">Technical <span>Expertise</span></h2>
      <p className="section-subtitle">Core competencies in engineering technology and software development</p>
      
      <div className="skills-container">
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <h3>Programming Languages</h3>
          <div className="skill-items">
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Java</span>
            <span className="skill-tag">C</span>
            <span className="skill-tag">C#</span>
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">PHP</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-globe"></i>
          </div>
          <h3>Web Development</h3>
          <div className="skill-items">
            <span className="skill-tag">HTML</span>
            <span className="skill-tag">CSS</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">Responsive Design</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-brain"></i>
          </div>
          <h3>Data Science & ML</h3>
          <div className="skill-items">
            <span className="skill-tag">Machine Learning</span>
            <span className="skill-tag">Data Analysis</span>
            <span className="skill-tag">Statistical Modeling</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-tools"></i>
          </div>
          <h3>Engineering Tools</h3>
          <div className="skill-items">
            <span className="skill-tag">AutoCAD</span>
            <span className="skill-tag">SolidWorks</span>
            <span className="skill-tag">Adobe Photoshop</span>
            <span className="skill-tag">MS Office</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-database"></i>
          </div>
          <h3>Database Management</h3>
          <div className="skill-items">
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">Database Design</span>
            <span className="skill-tag">Data Modeling</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-project-diagram"></i>
          </div>
          <h3>Project Management</h3>
          <div className="skill-items">
            <span className="skill-tag">Team Leadership</span>
            <span className="skill-tag">Time Management</span>
            <span className="skill-tag">Communication</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-mobile-alt"></i>
          </div>
          <h3>App Development</h3>
          <div className="skill-items">
            <span className="skill-tag">Mobile Applications</span>
            <span className="skill-tag">Cross-Platform</span>
            <span className="skill-tag">User Interface</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-cube"></i>
          </div>
          <h3>SolidWorks Design</h3>
          <div className="skill-items">
            <span className="skill-tag">3D Modeling</span>
            <span className="skill-tag">CAD Design</span>
            <span className="skill-tag">Technical Drawings</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-palette"></i>
          </div>
          <h3>UI/UX Design</h3>
          <div className="skill-items">
            <span className="skill-tag">User Interface</span>
            <span className="skill-tag">User Experience</span>
            <span className="skill-tag">Prototyping</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h3>Embedded Systems</h3>
          <div className="skill-items">
            <span className="skill-tag">Microcontrollers</span>
            <span className="skill-tag">Hardware Design</span>
            <span className="skill-tag">Firmware Development</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-wifi"></i>
          </div>
          <h3>IoT Development</h3>
          <div className="skill-items">
            <span className="skill-tag">Sensor Integration</span>
            <span className="skill-tag">Wireless Communication</span>
            <span className="skill-tag">Cloud Connectivity</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-cogs"></i>
          </div>
          <h3>Process Automation (PLC)</h3>
          <div className="skill-items">
            <span className="skill-tag">Ladder Diagrams</span>
            <span className="skill-tag">PLC Programming</span>
            <span className="skill-tag">SCADA Systems</span>
            <span className="skill-tag">Industrial Protocols</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h3>FPGA Programming</h3>
          <div className="skill-items">
            <span className="skill-tag">VHDL</span>
            <span className="skill-tag">Verilog</span>
            <span className="skill-tag">Digital Design</span>
            <span className="skill-tag">Hardware Implementation</span>
          </div>
        </div>
        
        <div className="skill-category">
          <div className="skill-icon">
            <i className="fa-solid fa-project-diagram"></i>
          </div>
          <h3>Graphical Programming</h3>
          <div className="skill-items">
            <span className="skill-tag">LabVIEW</span>
            <span className="skill-tag">Data Acquisition</span>
            <span className="skill-tag">Instrument Control</span>
            <span className="skill-tag">Test Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

