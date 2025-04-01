import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // State pre plynulú animáciu

  // Event listener pre scrollovanie
  useEffect(() => {
    const handleScroll = () => {
      // Základná detekcia scrollovania
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Plynulý prechod - hodnota od 0 do 1 založená na scrollovaní
      const scrollRange = 100; // Rozsah scrollovania, v ktorom sa prechod má odohrať
      const progress = Math.min(1, window.scrollY / scrollRange);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Dynamické štýly založené na scrollProgress
  const dynamicBgOpacity = scrollProgress * 0.9; // Maximálna opacita 0.9
  const dynamicBlur = `${scrollProgress * 8}px`; // Maximálny blur 8px
  const dynamicPaddingTop = `${Math.max(4, 20 - (scrollProgress * 16))}px`; // Od 20px do 4px
  const dynamicPaddingBottom = `${Math.max(20, 100 - (scrollProgress * 80))}px`; // Od 100px do 20px

  // Nová dynamická hodnota pre pozíciu červenej čiary
  const initialBottomOffset = 80; // Odhadovaná počiatočná hodnota v px, aby bola čiara pod menu
  const dynamicBottomOffset = `${Math.max(0, initialBottomOffset - (scrollProgress * initialBottomOffset))}px`; // Klesá z initialBottomOffset na 0

  return (
    <header 
      className="fixed w-full z-50 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: scrolled ? `rgba(24, 24, 24, ${dynamicBgOpacity})` : 'transparent',
        backdropFilter: scrolled ? `blur(${dynamicBlur})` : 'none',
        WebkitBackdropFilter: scrolled ? `blur(${dynamicBlur})` : 'none',
        paddingTop: dynamicPaddingTop,
        paddingBottom: dynamicPaddingBottom,
        boxShadow: scrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255, 0, 0, 0.2)', // Jemná červená linka keď nie je scrollnuté
      }}
    >
      <div className="container mx-auto px-6 flex justify-between items-start relative">
        {/* Logo */}
        <Link to="/" className="text-5xl font-bold relative overflow-hidden font-barlow tracking-wider">
          <span className="text-white">FPV</span>
          <span className="text-primary-red">ZONE</span>
        </Link>

        {/* Desktopové menu */}
        <nav className="hidden md:flex space-x-24 font-barlow">
          {['Domov', 'Videá', 'O nás', 'Kontakt'].map((item, index) => (
            <Link 
              key={item} 
              to={item === 'Domov' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-2xl text-light-gray hover:text-pure-white relative py-2 overflow-hidden ripple-effect group menu-item-border-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Text s animovaným efektom */}
              <span className="relative z-10 transition-colors duration-300 hover:text-white">{item}</span>
              
              {/* Animovaná linka pod textom */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-red transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        {/* Ikona hamburgeru pre mobilné zariadenia */}
        <button 
          className="md:hidden text-light-gray hover:text-pure-white ripple-effect"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Progresívna animovaná spodná lišta - s dynamickým bottom offsetom */}
        <div className="absolute left-0 h-px bg-primary-red" 
          style={{ 
            bottom: dynamicBottomOffset, // Použitie dynamickej hodnoty
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress,
            transition: 'all 0.5s ease-in-out', // Transition pre plynulý pohyb
            boxShadow: `0 0 ${scrollProgress * 10}px ${scrollProgress * 3}px rgba(255, 0, 0, ${scrollProgress * 0.5})` // Dynamické glow
          }}
        ></div>
      </div>

      {/* Mobilné menu */}
      <div className={`md:hidden bg-dark-gray bg-opacity-95 backdrop-filter backdrop-blur-lg overflow-hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen py-10 shadow-xl' : 'max-h-0'
      }`}>
        <nav className="container mx-auto px-6 flex flex-col items-center justify-center space-y-8 font-barlow h-full">
          {['Domov', 'Videá', 'O nás', 'Kontakt'].map((item, index) => (
            <Link 
              key={item} 
              to={item === 'Domov' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-3xl text-light-gray hover:text-pure-white py-3 transition-all duration-300 ripple-effect"
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