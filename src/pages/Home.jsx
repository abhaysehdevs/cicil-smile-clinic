import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import './Home.css';

const HERO_IMAGES = [
  '/cicil2.jpg',
  '/cicil5.jpg',
  '/cicil6.jpg',
  '/cicil7.jpg'
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {HERO_IMAGES.map((img, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1>Your Smile Is Our Priority</h1>
          <p className="hero-tagline">For Complete Oral Health Care</p>
          <div className="hero-actions">
            <Link to="/book" className="btn-primary" style={{ marginRight: '15px' }}>Book an Appointment</Link>
            <Link to="/services" className="btn-ghost">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container trust-container">
          <div className="trust-item">
            <h3>8+</h3>
            <p>Years Experience</p>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <h3>4.8★</h3>
            <p>Google Rated</p>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <h3>2</h3>
            <p>Clinics in Faridabad</p>
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="section about-snapshot">
        <div className="container">
          <div className="grid grid-cols-2 align-center">
            <div className="about-image-wrapper">
              <img src="/cicil.jpg" alt="Dr. Cicil Mathur" className="about-image" />
              <div className="experience-badge">
                Ex-Safdarjung Hospital Surgeon
              </div>
            </div>
            <div className="about-text">
              <h2>Meet Dr. Cicil Mathur</h2>
              <h4 className="subtitle">BDS, Advanced General Dentistry</h4>
              <p>
                With over 8 years of clinical experience and a robust background at the prestigious Safdarjung Hospital, New Delhi, Dr. Cicil Mathur is dedicated to providing premium, painless dental care in Faridabad.
              </p>
              <p>
                From advanced implants to cosmetic smile makeovers, experience world-class dentistry designed around your comfort.
              </p>
              <Link to="/about" className="btn-outline" style={{ marginTop: '20px' }}>Read Full Profile <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '5px' }}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="section section-grey services-snippet">
        <div className="container">
          <h2 className="section-title">Our Premium <span>Services</span></h2>
          <div className="grid grid-cols-3">
            {[
              { title: "Dental Implants", desc: "Permanent, life-like tooth replacement with titanium implants" },
              { title: "Root Canal Treatment", desc: "Pain-free RCT with advanced endodontic techniques" },
              { title: "Teeth Whitening", desc: "Professional in-clinic whitening for a noticeably brighter smile" },
              { title: "Braces & Retainers", desc: "Orthodontic solutions for properly aligned, beautiful smiles" },
              { title: "Crowns & Bridges", desc: "Durable restorations that look and feel like natural teeth" },
              { title: "Tooth Coloured Filling", desc: "Natural-looking composite fillings that blend perfectly" }
            ].map((service, i) => (
              <div key={i} className="service-card text-center">
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#C4A165" d="M12 2c-3 0-5.5 2-6 5.5-.3 2.1.2 4.1 1.5 5.5l1.5 10c.2 1.1 1.5 1.5 2.2.6L12 21l.8 2.6c.7.9 2 .5 2.2-.6l1.5-10c1.3-1.4 1.8-3.4 1.5-5.5C17.5 4 15 2 12 2z"/></svg>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-us">
        <div className="container">
          <div className="grid grid-cols-2 align-center">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Why Choose <span>Dr. Cicil's</span> Smile Center?</h2>
              <p style={{ marginBottom: '30px' }}>We combine advanced dental technology with a gentle, patient-first approach to give you the smile you deserve.</p>
              <ul className="feature-list">
                <li><CheckCircle2 color="#C4A165" className="feature-icon" /> <strong>Ex-Safdarjung Hospital Experience</strong> - Trust your smile with a highly qualified professional.</li>
                <li><CheckCircle2 color="#C4A165" className="feature-icon" /> <strong>Advanced Digital X-Ray (RVG)</strong> - For precise, low-radiation diagnosis.</li>
                <li><CheckCircle2 color="#C4A165" className="feature-icon" /> <strong>2 Conveniently Located Clinics</strong> - Serving you in Dayalbagh & Sector 45.</li>
                <li><CheckCircle2 color="#C4A165" className="feature-icon" /> <strong>Personalised Oral Care</strong> - Custom treatment plans for every patient.</li>
              </ul>
            </div>
            <div className="why-image">
              <img src="/cicil10.jpg" alt="Dental Care in Faridabad" style={{ borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-grey testimonials">
        <div className="container">
          <h2 className="section-title">Patient <span>Stories</span></h2>
          <div className="grid grid-cols-3">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C4A165" color="#C4A165" />)}
              </div>
              <p className="review-text">"Dr. Cicil is extremely professional and gentle. Got my root canal done here and it was completely pain-free. The clinic is well-equipped and hygienic. Highly recommended for anyone in Faridabad."</p>
              <p className="reviewer">— Verified Google Review, Dayalbagh Clinic</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C4A165" color="#C4A165" />)}
              </div>
              <p className="review-text">"Best dental experience I've had. The Sector 45 clinic is very clean and modern. Dr. Cicil explained the entire procedure before starting. My implant came out perfect."</p>
              <p className="reviewer">— Verified Google Review, Sector 45 Clinic</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C4A165" color="#C4A165" />)}
              </div>
              <p className="review-text">"Went for teeth whitening and braces consultation. Dr. Cicil is very knowledgeable and doesn't push unnecessary treatments. Prices are fair and the staff is courteous."</p>
              <p className="reviewer">— Verified Google Review, Dayalbagh Clinic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Preview */}
      <section className="section locations-preview">
        <div className="container">
          <h2 className="section-title">Visit Our <span>Clinics</span></h2>
          <div className="grid grid-cols-2">
            <div className="location-card">
              <h3>Dayalbagh Clinic</h3>
              <p className="address">Block GC, Dayal Bagh Colony, Faridabad, Haryana 121009</p>
              <p className="timing"><strong>Hours:</strong> Tue - Sun, 3:00 PM – 8:00 PM</p>
              <div className="location-actions">
                <a href="tel:+918076105859" className="btn-outline"><Phone size={16} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}/> +91 80761 05859</a>
              </div>
            </div>
            <div className="location-card">
              <h3>Sector 45 Clinic</h3>
              <p className="address">House No. 199, Sector 45, Faridabad, Haryana 121010</p>
              <p className="timing"><strong>Hours:</strong> Mon - Sat, 10:00 AM – 2:00 PM</p>
              <div className="location-actions">
                <a href="tel:+919971159099" className="btn-outline"><Phone size={16} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}/> +91 99711 59099</a>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '30px' }}>
            <Link to="/locations" className="btn-ghost" style={{ backgroundColor: 'var(--dark-charcoal)' }}>View on Map</Link>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="section section-gold text-center">
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready for a Healthier Smile?</h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>Book your consultation today and take the first step towards perfect oral health.</p>
          <Link to="/book" className="btn-primary" style={{ backgroundColor: 'var(--dark-charcoal)', color: 'var(--white)' }}>Book Your Appointment Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
