import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import './Locations.css';

const Locations = () => {
  return (
    <div className="locations-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Our Clinics in Faridabad</h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#555' }}>
            Two conveniently located centers offering premium dental care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 locations-grid">
            
            {/* Dayalbagh Location */}
            <div className="location-card-detailed">
              <div className="location-header">
                <h2>Dayalbagh Clinic</h2>
                <div className="rating-badge">Google Rating: ⭐ 4.8 / 5 (66+ reviews)</div>
              </div>
              
              <div className="location-info">
                <div className="info-row">
                  <MapPin className="info-icon" />
                  <p>Block GC, Dayal Bagh Colony, Faridabad, Haryana 121009<br/>
                  <small style={{color: '#888'}}>Landmark: Near Bikaner Sweet</small></p>
                </div>
                <div className="info-row">
                  <Phone className="info-icon" />
                  <p><a href="tel:+918076105859" className="text-link">+91 80761 05859</a></p>
                </div>
              </div>

              <div className="map-container">
                <iframe 
                  src="https://maps.google.com/maps?q=Block+GC,+Dayal+Bagh+Colony,+Faridabad,+Haryana+121009&output=embed" 
                  width="100%" 
                  height="250" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dayalbagh Clinic Map"
                ></iframe>
              </div>

              <div className="location-actions">
                <a href="https://maps.google.com/maps?q=Block+GC,+Dayal+Bagh+Colony,+Faridabad,+Haryana+121009" target="_blank" rel="noreferrer" className="btn-primary" style={{flex: 1}}>Get Directions</a>
                <a href="tel:+918076105859" className="btn-outline" style={{flex: 1}}>Call Now</a>
              </div>
            </div>

            {/* Sector 45 Location */}
            <div className="location-card-detailed">
              <div className="location-header">
                <h2>Sector 45 Clinic</h2>
                <div className="rating-badge">Google Rating: ⭐ 5.0 / 5 (13 reviews)</div>
              </div>
              
              <div className="location-info">
                <div className="info-row">
                  <MapPin className="info-icon" />
                  <p>House No. 199, Sector 45, Faridabad, Haryana 121010<br/>
                  <small style={{color: '#888'}}>On-site services available</small></p>
                </div>
                <div className="info-row">
                  <Phone className="info-icon" />
                  <p><a href="tel:+919971159099" className="text-link">+91 99711 59099</a></p>
                </div>
              </div>

              <div className="map-container">
                <iframe 
                  src="https://maps.google.com/maps?q=House+No+199,+Sector+45,+Faridabad,+Haryana+121010&output=embed" 
                  width="100%" 
                  height="250" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sector 45 Clinic Map"
                ></iframe>
              </div>

              <div className="location-actions">
                <a href="https://maps.google.com/maps?q=House+No+199,+Sector+45,+Faridabad,+Haryana+121010" target="_blank" rel="noreferrer" className="btn-primary" style={{flex: 1}}>Get Directions</a>
                <a href="tel:+919971159099" className="btn-outline" style={{flex: 1}}>Call Now</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <h2 className="section-title text-center" style={{marginBottom: '40px'}}>Clinic <span>Hours</span></h2>
          <div className="hours-table-wrap">
            <table className="hours-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Dayalbagh Clinic</th>
                  <th>Sector 45 Clinic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td className="closed">Closed</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td>10:00 AM – 2:00 PM</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>3:00 PM – 8:00 PM</td>
                  <td className="closed">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="emergency-note">
            <Clock size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/>
            <em>Timings may vary. Call ahead to confirm. Emergency dental care available — call <a href="tel:+918076105859">+91 80761 05859</a>.</em>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Locations;
