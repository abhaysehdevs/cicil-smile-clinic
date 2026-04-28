import React from 'react';
import './Gallery.css';

const GALLERY_DATA = [
  {
    category: "Our Clinics",
    images: ["./cicil8.jpg", "./cicil2.jpg"]
  },
  {
    category: "Equipment & Technology",
    images: ["./cicil10.jpg", "./cicil11.jpg"]
  },
  {
    category: "Happy Smiles",
    images: ["./cicil9.jpg", "./cicil12.jpg"]
  }
];

const Gallery = () => {
  return (
    <div className="gallery-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Smile Gallery</h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#555' }}>
            Take a tour of our state-of-the-art facilities and see the results we achieve.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {GALLERY_DATA.map((section, idx) => (
            <div key={idx} className="gallery-section">
              <h2 className="section-title text-left" style={{textAlign: 'left', marginBottom: '30px'}}>{section.category}</h2>
              <div className="gallery-grid">
                {section.images.map((img, i) => (
                  <div key={i} className="gallery-item">
                    <img src={img} alt={`${section.category} view ${i+1}`} loading="lazy" />
                    <div className="gallery-overlay">
                      <div className="gallery-icon">+</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
