import React, { useState } from 'react';
import { Phone, MapPin, Mail, Instagram, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(`Hi, my name is ${formData.name}. ${formData.message} My contact: ${formData.phone}`);
    window.open(`https://wa.me/918076105859?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#555' }}>
            We're here to answer your questions and help you schedule your visit.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 contact-grid">
            
            {/* Contact Information */}
            <div className="contact-info-panel">
              <h2 style={{fontSize: '2rem', marginBottom: '30px'}}>Clinic Information</h2>
              
              <div className="info-block">
                <h3>Dayalbagh Clinic</h3>
                <div className="info-row">
                  <MapPin className="info-icon" />
                  <p>Block GC, Dayal Bagh Colony<br/>Faridabad, Haryana 121009</p>
                </div>
                <div className="info-row">
                  <Phone className="info-icon" />
                  <p><a href="tel:+918076105859">+91 80761 05859</a></p>
                </div>
              </div>

              <div className="info-block">
                <h3>Sector 45 Clinic</h3>
                <div className="info-row">
                  <MapPin className="info-icon" />
                  <p>House No. 199, Sector 45<br/>Faridabad, Haryana 121010</p>
                </div>
                <div className="info-row">
                  <Phone className="info-icon" />
                  <p><a href="tel:+919971159099">+91 99711 59099</a></p>
                </div>
              </div>

              <div className="info-block" style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '30px'}}>
                <div className="info-row align-center">
                  <Mail className="info-icon" />
                  <p><a href="mailto:cicil.mathur@gmail.com">cicil.mathur@gmail.com</a></p>
                </div>
                <div className="info-row align-center">
                  <Instagram className="info-icon" />
                  <p><a href="https://instagram.com/dr.cicilsmilecenter" target="_blank" rel="noreferrer">@dr.cicilsmilecenter</a></p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-panel card-shadow">
              <h2 style={{fontSize: '1.8rem', marginBottom: '10px'}}>Send us a Message</h2>
              <p style={{color: '#666', marginBottom: '30px'}}>Fill out the form below and we will get back to you via WhatsApp.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" id="name" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">How can we help? *</label>
                  <textarea id="message" name="message" className="form-control" rows="5" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>
                  <Send size={18} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section section-grey">
        <div className="container">
          <h2 className="section-title text-center">Find Us on <span>Google Maps</span></h2>
          <div className="grid grid-cols-2" style={{gap: '30px', marginTop: '40px'}}>
            <div style={{borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'}}>
              <h3 style={{backgroundColor: 'var(--primary-gold)', color: '#fff', padding: '15px', margin: 0, textAlign: 'center', fontSize: '1.1rem'}}>Dayalbagh Location</h3>
              <iframe 
                src="https://maps.google.com/maps?q=Block+GC,+Dayal+Bagh+Colony,+Faridabad,+Haryana+121009&output=embed" 
                width="100%" height="300" style={{border: 0, display: 'block'}} allowFullScreen="" loading="lazy" title="Map 1">
              </iframe>
            </div>
            <div style={{borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'}}>
              <h3 style={{backgroundColor: 'var(--primary-gold)', color: '#fff', padding: '15px', margin: 0, textAlign: 'center', fontSize: '1.1rem'}}>Sector 45 Location</h3>
              <iframe 
                src="https://maps.google.com/maps?q=House+No+199,+Sector+45,+Faridabad,+Haryana+121010&output=embed" 
                width="100%" height="300" style={{border: 0, display: 'block'}} allowFullScreen="" loading="lazy" title="Map 2">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
