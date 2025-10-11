import React, { useEffect, useRef } from 'react';

const Experience = () => {
  const experienceRef = useRef(null);

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

    if (experienceRef.current) {
      sectionObserver.observe(experienceRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="experience" id="experience" ref={experienceRef}>
      <h2 className="heading">Work <span>Experience</span></h2>
      <p className="section-subtitle">Professional journey and career milestones</p>
      
      <div className="experience-container">
        <div className="experience-card">
          <div className="experience-icon">
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <div className="experience-content">
            <h3>Training Assistant Manager</h3>
            <h4>Ebony Holdings (Pvt) Ltd</h4>
            <p className="experience-duration">2022 - 2023 (1 Year Experience)</p>
            <p className="experience-description">Managed training programs and assisted in organizational development initiatives.</p>
            <a href="#" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
