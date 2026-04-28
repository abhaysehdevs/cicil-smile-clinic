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
            <img src="./favicon_io/android-chrome-192x192.png" alt="Logo" width="36" height="36" style={{ borderRadius: '6px' }} />
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
