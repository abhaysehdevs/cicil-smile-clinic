import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import './BookAppointment.css';

const SERVICES = [
  "General Consultation",
  "Dental X-Ray (RVG)",
  "Tooth Coloured Filling",
  "Root Canal Treatment (RCT)",
  "Scaling & Polishing",
  "Extraction & Impaction",
  "Full & Partial Dentures",
  "Braces & Retainers",
  "Dental Implants",
  "Crowns & Bridges",
  "Gum Disease Treatment",
  "Teeth Whitening",
  "Cosmetic Procedures",
  "Dental Bonding",
  "Kids Dentistry"
];

const CLINICS = [
  { id: 'dayalbagh', name: 'Dayalbagh Clinic', timings: '3:00 PM – 8:00 PM (Closed Monday)' },
  { id: 'sector45', name: 'Sector 45 Clinic', timings: '10:00 AM – 2:00 PM (Closed Sunday)' }
];

const DAYALBAGH_SLOTS = [
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", 
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

const SECTOR45_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"
];

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    clinic: '',
    date: '',
    time: '',
    name: '',
    mobile: '',
    email: '',
    age: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Validate Date (Disable Mondays for Dayalbagh, Sundays for Sector 45)
  const isDateValid = (dateString, clinicId) => {
    if (!dateString) return true;
    const date = new Date(dateString);
    const day = date.getDay(); // 0 is Sunday, 1 is Monday
    
    if (clinicId === 'dayalbagh' && day === 1) return false;
    if (clinicId === 'sector45' && day === 0) return false;
    
    // Check if past date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;

    return true;
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (isDateValid(val, formData.clinic)) {
      updateForm('date', val);
      // Reset time slot if date changes
      if (formData.time) updateForm('time', '');
    } else {
      alert(formData.clinic === 'dayalbagh' 
        ? "Dayalbagh Clinic is closed on Mondays. Please select another date." 
        : "Sector 45 Clinic is closed on Sundays. Please select another date.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const clinicObj = CLINICS.find(c => c.id === formData.clinic);
    const clinicName = clinicObj ? clinicObj.name : formData.clinic;
    
    // Formatting variables mapping for WhatsApp
    const message = `Hi Dr. Cicil, I would like to book an appointment.\nService: ${formData.service}\nClinic: ${clinicName}\nDate: ${formData.date}\nTime: ${formData.time}\nName: ${formData.name}\nPhone: ${formData.mobile}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918076105859?text=${encodedMessage}`;

    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 2000);
  };

  return (
    <div className="booking-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Book an Appointment</h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#555' }}>
            Schedule your visit with Dr. Cicil Mathur in 4 easy steps.
          </p>
        </div>
      </section>

      <section className="section booking-section">
        <div className="container" style={{maxWidth: '800px'}}>
          
          <div className="booking-wizard card-shadow">
            
            {/* Step Indicator */}
            <div className={`step-indicator ${isSubmitting ? 'hidden' : ''}`}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} className={`step-circle ${step >= num ? 'active' : ''} ${step > num ? 'completed' : ''}`}>
                  {step > num ? <Check size={16} /> : num}
                </div>
              ))}
              <div className="step-line">
                <div className="step-line-progress" style={{width: `${((step-1)/3)*100}%`}}></div>
              </div>
            </div>

            {/* Submission State */}
            {isSubmitting ? (
              <div className="submission-state text-center animate-fade-in">
                <div className="success-icon-wrap">
                  <Check size={48} color="#FFFFFF" />
                </div>
                <h2>✅ Appointment Request Sent!</h2>
                <p>Dr. Cicil's team will confirm your slot within 2 hours via WhatsApp.<br/>
                You are being redirected to WhatsApp to complete your booking...</p>
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="wizard-step animate-fade-in">
                    <h2>Step 1: Select Service</h2>
                    <p className="step-desc">What do you need help with? If unsure, choose General Consultation.</p>
                    <div className="services-selector">
                      {SERVICES.map(srv => (
                        <div 
                          key={srv} 
                          className={`selector-card ${formData.service === srv ? 'selected' : ''}`}
                          onClick={() => updateForm('service', srv)}
                        >
                          {srv}
                        </div>
                      ))}
                    </div>
                    <div className="wizard-actions right-align">
                      <button 
                        className="btn-primary" 
                        disabled={!formData.service}
                        onClick={nextStep}
                      >
                        Next Step <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="wizard-step animate-fade-in">
                    <h2>Step 2: Choose Clinic</h2>
                    <p className="step-desc">Select the location most convenient for you.</p>
                    <div className="clinics-selector grid grid-cols-2">
                      {CLINICS.map(clinic => (
                        <div 
                          key={clinic.id} 
                          className={`clinic-card ${formData.clinic === clinic.id ? 'selected' : ''}`}
                          onClick={() => updateForm('clinic', clinic.id)}
                        >
                          <div className="radio-circle">
                            <div className="inner-dot"></div>
                          </div>
                          <h3>{clinic.name}</h3>
                          <p>{clinic.timings}</p>
                        </div>
                      ))}
                    </div>
                    <div className="wizard-actions space-between">
                      <button className="btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                      <button 
                        className="btn-primary" 
                        disabled={!formData.clinic}
                        onClick={nextStep}
                      >
                        Next Step <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="wizard-step animate-fade-in">
                    <h2>Step 3: Pick Date & Time</h2>
                    <p className="step-desc">For <strong>{formData.clinic === 'dayalbagh' ? 'Dayalbagh Clinic' : 'Sector 45 Clinic'}</strong></p>
                    
                    <div className="form-group" style={{marginBottom: '30px'}}>
                      <label>Select Date *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={formData.date} 
                        onChange={handleDateChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {formData.clinic === 'dayalbagh' && <small className="hint">Mondays are closed.</small>}
                      {formData.clinic === 'sector45' && <small className="hint">Sundays are closed.</small>}
                    </div>

                    {formData.date && (
                      <div className="form-group">
                        <label>Available Time Slots *</label>
                        <div className="time-slots">
                          {(formData.clinic === 'dayalbagh' ? DAYALBAGH_SLOTS : SECTOR45_SLOTS).map(time => (
                            <div 
                              key={time}
                              className={`time-chip ${formData.time === time ? 'selected' : ''}`}
                              onClick={() => updateForm('time', time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="wizard-actions space-between">
                      <button className="btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                      <button 
                        className="btn-primary" 
                        disabled={!formData.date || !formData.time}
                        onClick={nextStep}
                      >
                        Next Step <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="wizard-step animate-fade-in">
                    <h2>Step 4: Patient Details</h2>
                    <p className="step-desc">Just a few details so we can confirm your appointment.</p>
                    
                    <form onSubmit={handleSubmit} className="details-form">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" className="form-control" required 
                          value={formData.name} onChange={e => updateForm('name', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mobile Number *</label>
                        <input type="tel" className="form-control" required pattern="[0-9]{10,14}"
                          value={formData.mobile} onChange={e => updateForm('mobile', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2" style={{gap: '20px'}}>
                        <div className="form-group">
                          <label>Age</label>
                          <input type="number" className="form-control"
                            value={formData.age} onChange={e => updateForm('age', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Email (optional)</label>
                          <input type="email" className="form-control"
                            value={formData.email} onChange={e => updateForm('email', e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Additional Notes (optional)</label>
                        <textarea className="form-control" rows="3"
                          value={formData.notes} onChange={e => updateForm('notes', e.target.value)}></textarea>
                      </div>

                      <div className="wizard-summary">
                        <p><strong>Booking:</strong> {formData.service}</p>
                        <p><strong>At:</strong> {formData.clinic === 'dayalbagh' ? 'Dayalbagh Clinic' : 'Sector 45 Clinic'} on {formData.date} at {formData.time}</p>
                      </div>

                      <div className="wizard-actions space-between" style={{marginTop: '30px'}}>
                        <button type="button" className="btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                        <button type="submit" className="btn-primary">Confirm Appointment</button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
