import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/918076105859" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <div className="whatsapp-tooltip">Chat with us on WhatsApp</div>
      <MessageCircle size={32} color="#FFFFFF" strokeWidth={1.5} />
    </a>
  );
};

export default WhatsAppButton;
