import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand">
          <img src="./favicon_io/android-chrome-192x192.png" alt="Logo" width="40" height="40" style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(196,161,101,0.5)' }} />
          <div className="brand-text">
            <span>DR. CICIL'S</span>
            <span className="brand-subtitle">SMILE CENTER</span>
          </div>
        </Link>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} color="#2C2C2C" /> : <Menu size={28} color={isScrolled ? "#2C2C2C" : "#C4A165"} />}
        </div>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/locations" className="nav-link">Locations</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/book" className="btn-primary nav-cta">Book Appointment</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
