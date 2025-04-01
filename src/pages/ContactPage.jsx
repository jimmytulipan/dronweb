import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulácia odoslania formulára
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({ 
        type: 'success', 
        text: 'Vaša správa bola úspešne odoslaná. Ďakujeme za kontaktovanie.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Vymaž hlásenie po 5 sekundách
      setTimeout(() => setSubmitMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-4xl font-bold mb-10 text-center">Kontaktujte nás</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Informačná sekcia */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800/30 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Kontaktné informácie</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-primary-red text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresa</h3>
                    <p className="text-light-gray">Hlavná 123, 831 01 Bratislava, Slovensko</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <FaPhone className="text-primary-red text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefón</h3>
                    <p className="text-light-gray">+421 900 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-primary-red text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-light-gray">info@fpvzone.sk</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <FaClock className="text-primary-red text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Otváracie hodiny</h3>
                    <p className="text-light-gray">Pondelok - Piatok: 9:00 - 17:00</p>
                    <p className="text-light-gray">Víkend: Len po dohode</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Sledujte nás</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-light-gray hover:bg-primary-red hover:text-pure-white transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-light-gray hover:bg-primary-red hover:text-pure-white transition duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-light-gray hover:bg-primary-red hover:text-pure-white transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-light-gray hover:bg-primary-red hover:text-pure-white transition duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Kontaktný formulár */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800/30 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Napíšte nám</h2>
              
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2">Meno</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                      required
                      placeholder="Vaše meno"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                      required
                      placeholder="Váš email"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block mb-2">Predmet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                    required
                    placeholder="Predmet správy"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2">Správa</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                    required
                    placeholder="Vaša správa..."
                  ></textarea>
                </div>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Odosielanie...' : 'Odoslať správu'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage; 