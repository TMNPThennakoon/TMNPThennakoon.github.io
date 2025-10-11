import React, { useEffect, useRef } from 'react';

const Education = () => {
  const educationRef = useRef(null);

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

    if (educationRef.current) {
      sectionObserver.observe(educationRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="education" id="education" ref={educationRef}>
      <h2 className="heading">Education & <span>Qualifications</span></h2>
      <p className="section-subtitle">Academic achievements and professional certifications</p>
      
      <div className="education-container">
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div className="education-content">
            <h3>University Education</h3>
            <h4>Faculty of Technology, University of Colombo</h4>
            <p className="education-details">Bachelor of Engineering Technology Honours in Instrumentation and Automation (Reading)</p>
          </div>
        </div>
        
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-school"></i>
          </div>
          <div className="education-content">
            <h3>2021 Advance Level</h3>
            <h4>Mayurapada C.C. Narammala</h4>
            <p className="education-details">
              Engineering Technology - A<br />
              Science for Technology - B<br />
              Information & Communication Technology - B
            </p>
          </div>
        </div>
        
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-certificate"></i>
          </div>
          <div className="education-content">
            <h3>Diploma in ICT</h3>
            <h4>ICBT Kurunegala Campus</h4>
            <p className="education-details">Comprehensive Information and Communication Technology diploma program</p>
          </div>
        </div>
        
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-language"></i>
          </div>
          <div className="education-content">
            <h3>Diploma in English</h3>
            <h4>ICBT Kurunegala Campus</h4>
            <p className="education-details">Advanced English language proficiency and communication skills</p>
          </div>
        </div>
        
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-laptop-code"></i>
          </div>
          <div className="education-content">
            <h3>Diploma in ICT</h3>
            <h4>Yes Computer Institute</h4>
            <p className="education-details">Practical computer skills and information technology fundamentals</p>
          </div>
        </div>
        
        <div className="education-card">
          <div className="education-icon">
            <i className="fa-solid fa-cogs"></i>
          </div>
          <div className="education-content">
            <h3>Advanced Certificate Course</h3>
            <h4>Sri Lanka Institute of Robotics (SLIR)</h4>
            <p className="education-details">PLC Programming & Automation (2025)</p>
          </div>
        </div>
      </div>

      {/* Licenses & Certifications Section */}
      <div className="certifications-section">
        <h2 className="heading">Licenses & <span>Certifications</span></h2>
        <p className="section-subtitle">Professional certifications and specialized training programs</p>
        
        <div className="certifications-container">
          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-code"></i>
            </div>
            <div className="cert-credential-id">klmvmNVEbs</div>
            <h3>Front-End Web Developer</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>May 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">HTML</span>
              <span className="skill-tag">CSS</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="cert-credential-id">CEP9r8Cjtp</div>
            <h3>Project Communication and Stakeholder Management</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>July 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Project Management</span>
              <span className="skill-tag">Communication</span>
              <span className="skill-tag">Leadership</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-server"></i>
            </div>
            <div className="cert-credential-id">BZydlar9Hf</div>
            <h3>Server-Side Web Programming</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>July 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">Backend</span>
              <span className="skill-tag">API</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div className="cert-credential-id">301531856</div>
            <h3>Fundamentals of Digital Marketing</h3>
            <h4>Google</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Digital Marketing</span>
              <span className="skill-tag">SEO</span>
              <span className="skill-tag">Analytics</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div className="cert-credential-id">BZyhjkk8Hf</div>
            <h3>Generative AI</h3>
            <h4>Coursera</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">AI</span>
              <span className="skill-tag">Machine Learning</span>
              <span className="skill-tag">Deep Learning</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-brands fa-python"></i>
            </div>
            <div className="cert-credential-id">R3yZhacfTe</div>
            <h3>Python Programming</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Programming</span>
              <span className="skill-tag">Data Structures</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-project-diagram"></i>
            </div>
            <div className="cert-credential-id">CodezAGaV6JVe4</div>
            <h3>Foundations of Project Management</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Project Management</span>
              <span className="skill-tag">Planning</span>
              <span className="skill-tag">Leadership</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <div className="cert-credential-id">rhsRICXBHs</div>
            <h3>Agile Project Management in ICT Projects</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Agile</span>
              <span className="skill-tag">Scrum</span>
              <span className="skill-tag">ICT</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-microchip"></i>
            </div>
            <div className="cert-credential-id">5dxqvoubbc</div>
            <h3>AI/ML Engineer - Stage 1</h3>
            <h4>SLIIT</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>July 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">AI</span>
              <span className="skill-tag">Machine Learning</span>
              <span className="skill-tag">Data Science</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-network-wired"></i>
            </div>
            <div className="cert-credential-id">yk75lue7cs</div>
            <h3>AI/ML Engineer - Stage 2</h3>
            <h4>SLIIT</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>July 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Deep Learning</span>
              <span className="skill-tag">Neural Networks</span>
              <span className="skill-tag">TensorFlow</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="cert-credential-id">971CD1C2AEC</div>
            <h3>Software Engineer Intern</h3>
            <h4>HackerRank</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>March 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Software Engineering</span>
              <span className="skill-tag">Problem Solving</span>
              <span className="skill-tag">Algorithms</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>

          <div className="certification-card">
            <div className="cert-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div className="cert-credential-id">V2S4tZpk3v</div>
            <h3>Project Scope and Schedule Management</h3>
            <h4>University of Moratuwa</h4>
            <div className="cert-date">
              <i className="fa-solid fa-calendar"></i>
              <span>June 2024</span>
            </div>
            <div className="cert-skills">
              <span className="skill-tag">Project Management</span>
              <span className="skill-tag">Scheduling</span>
              <span className="skill-tag">Scope</span>
            </div>
            <button className="view-cert-btn">
              <i className="fa-solid fa-certificate"></i>
              View Certificate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
