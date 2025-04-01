import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Po otvorení mobilného menu zablokovať scrollovanie body
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header 
      className={`sticky w-full z-50 ${isMobile ? 'mobile-header-fixed' : ''}`}
      style={{
        backgroundColor: 'rgba(24, 24, 24, 0.9)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        paddingTop: 'calc(1rem + env(safe-area-inset-top))',
        paddingBottom: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid rgba(255, 0, 0, 0.2)',
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-start relative">
        {/* Logo - upravené pre lepšiu čitateľnosť na mobiloch */}
        <Link to="/" className="text-3xl sm:text-4xl md:text-5xl font-bold relative overflow-hidden font-barlow tracking-wider">
          <span className="text-white">FPV</span>
          <span className="text-primary-red">ZONE</span>
        </Link>

        {/* Desktopové menu */}
        <nav className="hidden md:flex space-x-12 lg:space-x-24 font-barlow">
          {['Domov', 'Videá', 'O nás', 'Kontakt'].map((item, index) => (
            <Link 
              key={item} 
              to={item === 'Domov' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-xl lg:text-2xl text-light-gray hover:text-pure-white relative py-2 overflow-hidden ripple-effect group menu-item-border-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Text s animovaným efektom */}
              <span className="relative z-10 transition-colors duration-300 hover:text-white">{item}</span>
              
              {/* Animovaná linka pod textom */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-red transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        {/* Ikona hamburgeru pre mobilné zariadenia - zväčšená pre lepšiu použiteľnosť */}
        <button 
          className="md:hidden text-light-gray hover:text-pure-white ripple-effect p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobilné menu - optimalizované pre iPhone */}
      <div className={`fixed inset-0 z-50 bg-dark-gray bg-opacity-95 backdrop-filter backdrop-blur-lg transform transition-transform duration-500 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ 
        paddingTop: 'calc(4rem + env(safe-area-inset-top))', // Väčší padding-top pre fixný header
        paddingBottom: 'env(safe-area-inset-bottom)',
        top: 0, // Začiatok od vrchu obrazovky
        height: '100%' // Plná výška obrazovky
      }}>
        <div className="absolute top-4 right-4" style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}>
          <button 
            className="text-light-gray hover:text-pure-white p-2" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Zavrieť menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="h-full flex flex-col items-center justify-center space-y-8 font-barlow">
          {['Domov', 'Videá', 'O nás', 'Kontakt'].map((item, index) => (
            <Link 
              key={item} 
              to={item === 'Domov' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-3xl text-light-gray hover:text-pure-white py-3 px-4 transition-all duration-300 ripple-effect w-full text-center"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 