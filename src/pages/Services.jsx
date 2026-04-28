import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import './Services.css';

const SERVICES_DATA = [
  { id: 1, name: "Dental X-Ray (RVG)", desc: "Digital X-rays for precise, low-radiation diagnosis", highlight: false },
  { id: 2, name: "Tooth Coloured Filling", desc: "Natural-looking composite fillings that blend perfectly", highlight: false },
  { id: 3, name: "Root Canal Treatment (RCT)", desc: "Pain-free RCT with advanced endodontic techniques", highlight: true },
  { id: 4, name: "Scaling & Polishing", desc: "Professional cleaning to remove tartar and brighten teeth", highlight: false },
  { id: 5, name: "Extraction & Impaction", desc: "Safe, comfortable tooth removal including wisdom teeth", highlight: false },
  { id: 6, name: "Full & Partial Dentures", desc: "Custom-fit dentures for a natural look and function", highlight: false },
  { id: 7, name: "Braces & Retainers", desc: "Orthodontic solutions for properly aligned, beautiful smiles", highlight: false },
  { id: 8, name: "Dental Implants", desc: "Permanent, life-like tooth replacement with titanium implants", highlight: true },
  { id: 9, name: "Crowns & Bridges", desc: "Durable restorations that look and feel like natural teeth", highlight: false },
  { id: 10, name: "Gum Disease Treatment", desc: "Comprehensive periodontal care for healthier gums", highlight: false },
  { id: 11, name: "Teeth Whitening", desc: "Professional in-clinic whitening for a noticeably brighter smile", highlight: false },
  { id: 12, name: "Cosmetic Procedures", desc: "Smile makeovers, bonding, and aesthetic enhancements", highlight: false },
  { id: 13, name: "Dental Bonding", desc: "Quick, cost-effective repair for chipped or discoloured teeth", highlight: false },
  { id: 14, name: "Kids Dentistry", desc: "Gentle, child-friendly dental care in a comfortable environment", highlight: false }
];

const Services = () => {
  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Complete Oral Health Care Under One Roof</h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '20px auto 0' }}>
            From simple preventive procedures to full-mouth rehabilitation, Dr. Cicil's Smile Center provides state-of-the-art dental care for your whole family.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-3 services-grid">
            {SERVICES_DATA.map((service, index) => (
              <div key={service.id} className={`service-item reveal stagger-${(index % 3) + 1} ${service.highlight ? 'highlighted' : ''}`}>
                <div className="service-icon-box">
                  <CheckCircle2 color={service.highlight ? '#FFFFFF' : '#C4A165'} size={28} />
                </div>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <Link to={`/book`} className="service-link">
                  Consult for this <ChevronRight size={16} />
                </Link>
                {service.highlight && (
                  <div className="premium-badge">Premium Care Focus</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gold text-center">
        <div className="container">
          <h2>Not sure which treatment you need?</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto 30px', fontSize: '1.1rem' }}>
            Book a General Consultation. Dr. Cicil will examine your oral health and develop a personalized treatment plan.
          </p>
          <Link to="/book" className="btn-primary" style={{ backgroundColor: 'var(--white)', color: 'var(--dark-charcoal)' }}>Book a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
