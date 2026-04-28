import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Meet Dr. Cicil Mathur</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 align-center">
            <div className="about-hero-image reveal stagger-1">
              <img src="./cicil.jpg" alt="Dr. Cicil Mathur" />
            </div>
            <div className="about-content reveal stagger-2">
              <h2>Committed to Excellence in Dentistry</h2>
              <div className="credentials-strip">
                <span>BDS</span>
                <span className="dot">•</span>
                <span>Advanced General Dentistry</span>
                <span className="dot">•</span>
                <span>8+ Years Clinical Experience</span>
                <span className="dot">•</span>
                <span style={{color: 'var(--primary-gold)', fontWeight: 'bold'}}>Ex-Safdarjung Hospital</span>
              </div>
              <div className="bio-text">
                <p>
                  Dr. Cicil Mathur is a BDS-qualified dental surgeon with over 8 years of hands-on clinical experience. A graduate of Sudha Rustagi College of Dental Sciences, Faridabad, he further honed his skills as a Dental Surgeon at the prestigious Vardhman Mahavir Medical College & Safdarjung Hospital, New Delhi — one of India's leading government medical institutions.
                </p>
                <p>
                  Today, Dr. Mathur leads two thriving clinics in Faridabad, offering complete oral healthcare services with a focus on cosmetic, implant, and restorative dentistry.
                </p>
                <p>
                  His philosophy is simple: every patient deserves a healthy, confident smile — achieved with precision, care, and the latest dental technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container text-center">
          <h2 className="section-title reveal">Core <span>Specialties</span></h2>
          <div className="grid grid-cols-3" style={{ marginTop: '40px' }}>
            <div className="specialty-card reveal stagger-1">
              <h3>Cosmetic Dentistry</h3>
              <p>Enhancing aesthetics through veneers, laminates, and smile makeovers designed specifically for your facial structure.</p>
            </div>
            <div className="specialty-card reveal stagger-2">
              <h3>Implantology</h3>
              <p>State-of-the-art permanent tooth replacements that function and look exactly like natural teeth.</p>
            </div>
            <div className="specialty-card reveal stagger-3">
              <h3>Restorative Care</h3>
              <p>Preserving and restoring natural teeth through advanced endodontics (RCT) and high-quality crowns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container timeline-container">
          <h2 className="section-title reveal">Education & <span>Experience</span></h2>
          <div className="timeline">
            <div className="timeline-item reveal stagger-1">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2011 – 2016</div>
              <div className="timeline-content">
                <h3>BDS Degree</h3>
                <p>Sudha Rustagi College of Dental Sciences & Research, Kheri More, Faridabad</p>
              </div>
            </div>
            <div className="timeline-item reveal stagger-3">
              <div className="timeline-dot"></div>
              <div className="timeline-date">July 2018 – Aug 2019</div>
              <div className="timeline-content">
                <h3>Dental Surgeon</h3>
                <p>Vardhman Mahavir Medical College & Safdarjung Hospital, New Delhi</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2019 – Present</div>
              <div className="timeline-content">
                <h3>Private Practice</h3>
                <p>Founder & Principal Dentist at Dr. Cicil's Smile Center (Dayalbagh & Sector 45)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gold text-center">
        <div className="container">
          <h2>Our Core Mission in Faridabad</h2>
          <p style={{ maxWidth: '800px', margin: '20px auto 30px', fontSize: '1.1rem' }}>
            "We established Dr. Cicil's Smile Center with a singular vision: to bring premium, hospital-grade sterilization and advanced dental care to the heart of Faridabad at accessible prices."
          </p>
          <Link to="/book" className="btn-primary" style={{ backgroundColor: 'var(--dark-charcoal)' }}>Consult Dr. Cicil Today</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
