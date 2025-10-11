import React, { useEffect, useRef } from 'react';

const About = () => {
  const aboutRef = useRef(null);
  const progressBarsRef = useRef([]);
  const circularProgressRef = useRef([]);

  useEffect(() => {
    // Section animation observer
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

    if (aboutRef.current) {
      sectionObserver.observe(aboutRef.current);
    }

    // Progress bar animation observer
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressFill = entry.target;
            const width = progressFill.getAttribute('data-width');
            progressFill.style.width = width + '%';
            progressObserver.unobserve(progressFill);
          }
        });
      },
      { threshold: 0.5 }
    );

    progressBarsRef.current.forEach(bar => {
      if (bar) progressObserver.observe(bar);
    });

    // Circular progress animation observer
    const circularProgressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const circle = entry.target;
            const percentage = circle.getAttribute('data-percentage');
            const degrees = (percentage / 100) * 360;
            
            circle.style.background = `conic-gradient(var(--main-color) ${degrees}deg, rgba(0, 238, 255, 0.2) ${degrees}deg)`;
            circularProgressObserver.unobserve(circle);
          }
        });
      },
      { threshold: 0.5 }
    );

    circularProgressRef.current.forEach(circle => {
      if (circle) circularProgressObserver.observe(circle);
    });

    return () => {
      sectionObserver.disconnect();
      progressObserver.disconnect();
      circularProgressObserver.disconnect();
    };
  }, []);

  return (
    <section className="about" id="about" ref={aboutRef}>
      <div className="about-content">
        <h2 className="heading">About <span>Me</span></h2>
        <h3>Passionate Engineering Technology Student</h3>
        <p>I am a passionate and skilled engineer pursuing a Bachelor of Engineering Technology with Honours in Instrumentation and Automation at the University of Colombo. With a strong foundation in automation and a diverse technical skill set, including web development, machine learning, database management, app development, UI/UX design, FPGA programming, PLC programming, IoT development, embedded systems, SolidWorks designing, and programming languages like Python, SQL, and Java, I bring a holistic approach to engineering solutions.</p>
        
        <div className="stats">
          <div className="stat-item">
            <div className="stat-content">
              <h3>5+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                data-width="90"
                ref={el => progressBarsRef.current[0] = el}
              ></div>
            </div>
            <span className="progress-text">90%</span>
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                data-width="75"
                ref={el => progressBarsRef.current[1] = el}
              ></div>
            </div>
            <span className="progress-text">75%</span>
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <h3>10+</h3>
              <p>Technologies Mastered</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                data-width="85"
                ref={el => progressBarsRef.current[2] = el}
              ></div>
            </div>
            <span className="progress-text">85%</span>
          </div>
        </div>
        
        <div className="expertise">
          <div className="expertise-item">
            <i className="fa-solid fa-code"></i>
            <span>Web Development</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-mobile-alt"></i>
            <span>App Development</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-palette"></i>
            <span>UI/UX Design</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-microchip"></i>
            <span>FPGA Programming</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-cogs"></i>
            <span>PLC Programming</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-project-diagram"></i>
            <span>LabVIEW</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-wifi"></i>
            <span>IoT Development</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-microchip"></i>
            <span>Embedded Systems</span>
          </div>
          <div className="expertise-item">
            <i className="fa-solid fa-cube"></i>
            <span>SolidWorks Design</span>
          </div>
        </div>
      </div>
      
      <div className="about-img">
        <div className="img-wrapper">
          <img src="pro2.png" alt="About Nayana" />
          <div className="img-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
        
        <div className="soft-skills">
          <div className="circular-progress-container">
            <div className="circular-progress">
              <div 
                className="progress-circle" 
                data-percentage="90"
                ref={el => circularProgressRef.current[0] = el}
              >
                <div className="progress-value">90%</div>
              </div>
              <div className="skill-name">Team Work</div>
            </div>
            <div className="circular-progress">
              <div 
                className="progress-circle" 
                data-percentage="85"
                ref={el => circularProgressRef.current[1] = el}
              >
                <div className="progress-value">85%</div>
              </div>
              <div className="skill-name">Time Management</div>
            </div>
            <div className="circular-progress">
              <div 
                className="progress-circle" 
                data-percentage="80"
                ref={el => circularProgressRef.current[2] = el}
              >
                <div className="progress-value">80%</div>
              </div>
              <div className="skill-name">Leadership</div>
            </div>
            <div className="circular-progress">
              <div 
                className="progress-circle" 
                data-percentage="88"
                ref={el => circularProgressRef.current[3] = el}
              >
                <div className="progress-value">88%</div>
              </div>
              <div className="skill-name">Verbal & Written</div>
            </div>
            <div className="circular-progress">
              <div 
                className="progress-circle" 
                data-percentage="92"
                ref={el => circularProgressRef.current[4] = el}
              >
                <div className="progress-value">92%</div>
              </div>
              <div className="skill-name">Active Listening</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
