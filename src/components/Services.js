import React, { useEffect, useRef } from 'react';

const Services = () => {
  const servicesRef = useRef(null);

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

    if (servicesRef.current) {
      sectionObserver.observe(servicesRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="services" id="services" ref={servicesRef}>
      <h2 className="heading">Professional <span>Services</span></h2>
      <p className="section-subtitle">Engineering and technology solutions</p>
      
      <div className="services-container">
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <h3>Web Development</h3>
          <p>Custom web applications, responsive design, and modern user interfaces using HTML, CSS, JavaScript, and PHP.</p>
          <ul>
            <li>Frontend Development</li>
            <li>Backend Integration</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-drafting-compass"></i>
          </div>
          <h3>CAD Design & Modeling</h3>
          <p>Professional 2D and 3D design services using AutoCAD and SolidWorks for engineering and manufacturing applications.</p>
          <ul>
            <li>2D Drafting</li>
            <li>3D Modeling</li>
            <li>Technical Drawings</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-mobile-alt"></i>
          </div>
          <h3>Mobile App Development</h3>
          <p>Custom mobile application development for iOS and Android platforms with modern UI/UX design principles.</p>
          <ul>
            <li>Cross-Platform Development</li>
            <li>User Interface Design</li>
            <li>App Store Deployment</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-palette"></i>
          </div>
          <h3>UI/UX Design</h3>
          <p>Professional user interface and user experience design services for web and mobile applications.</p>
          <ul>
            <li>Wireframing & Prototyping</li>
            <li>User Research</li>
            <li>Visual Design</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h3>Embedded Systems Design</h3>
          <p>Custom embedded system solutions including microcontroller programming, hardware design, and firmware development.</p>
          <ul>
            <li>Microcontroller Programming</li>
            <li>Hardware Design</li>
            <li>Firmware Development</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-wifi"></i>
          </div>
          <h3>IoT Development</h3>
          <p>End-to-end IoT solutions including sensor integration, wireless communication, and cloud connectivity.</p>
          <ul>
            <li>Sensor Integration</li>
            <li>Wireless Protocols</li>
            <li>Cloud Connectivity</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-cogs"></i>
          </div>
          <h3>Process Automation (PLC)</h3>
          <p>Industrial automation solutions including PLC programming, ladder diagram design, SCADA systems, and industrial protocols.</p>
          <ul>
            <li>Ladder Diagram Design</li>
            <li>PLC Programming</li>
            <li>SCADA Systems</li>
            <li>Industrial Protocols</li>
          </ul>
        </div>
        
        <div className="service-box">
          <div className="service-icon">
            <i className="fa-solid fa-project-diagram"></i>
          </div>
          <h3>Graphical Programming (LabVIEW)</h3>
          <p>Professional LabVIEW development for data acquisition, instrument control, and test automation systems.</p>
          <ul>
            <li>LabVIEW Development</li>
            <li>Data Acquisition Systems</li>
            <li>Instrument Control</li>
            <li>Test Automation</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;

