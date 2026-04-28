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
          <svg className="tooth-icon" viewBox="0 0 24 24" width="28" height="28">
            <path fill="#C4A165" d="M12 2c-3 0-5.5 2-6 5.5-.3 2.1.2 4.1 1.5 5.5l1.5 10c.2 1.1 1.5 1.5 2.2.6L12 21l.8 2.6c.7.9 2 .5 2.2-.6l1.5-10c1.3-1.4 1.8-3.4 1.5-5.5C17.5 4 15 2 12 2z"/>
          </svg>
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
