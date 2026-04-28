import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="brand" style={{ marginBottom: '15px' }}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path fill="#C4A165" d="M12 2c-3 0-5.5 2-6 5.5-.3 2.1.2 4.1 1.5 5.5l1.5 10c.2 1.1 1.5 1.5 2.2.6L12 21l.8 2.6c.7.9 2 .5 2.2-.6l1.5-10c1.3-1.4 1.8-3.4 1.5-5.5C17.5 4 15 2 12 2z"/>
            </svg>
            <div className="brand-text">
              <span style={{ color: '#fff' }}>DR. CICIL'S</span>
              <span className="brand-subtitle" style={{ letterSpacing: '1px' }}>SMILE CENTER</span>
            </div>
          </div>
          <p className="footer-desc">
            Complete oral healthcare in Faridabad with a focus on cosmetic, implant, and restorative dentistry.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com/dr.cicilsmilecenter" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/book" style={{ color: '#C4A165' }}>Book Appointment</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <MapPin size={18} className="footer-icon" />
              <span><strong>Dayalbagh:</strong> Block GC, Dayal Bagh Colony</span>
            </li>
            <li>
              <Phone size={18} className="footer-icon" />
              <a href="tel:+918076105859">+91 80761 05859</a>
            </li>
            <li className="spacer"></li>
            <li>
              <MapPin size={18} className="footer-icon" />
              <span><strong>Sector 45:</strong> House No. 199, Sector 45</span>
            </li>
            <li>
              <Phone size={18} className="footer-icon" />
              <a href="tel:+919971159099">+91 99711 59099</a>
            </li>
            <li className="spacer"></li>
            <li>
              <Mail size={18} className="footer-icon" />
              <a href="mailto:cicil.mathur@gmail.com">cicil.mathur@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dr. Cicil's Smile Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
