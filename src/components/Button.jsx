import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary-red text-pure-white font-bold py-3 px-8 rounded-lg
        hover:bg-accent-red transition duration-300 ease-in-out
        transform hover:scale-105 focus:outline-none focus:ring-2
        focus:ring-primary-red focus:ring-opacity-50 relative
        overflow-hidden shadow-lg shadow-primary-red/20
        active:scale-95 disabled:opacity-50 disabled:pointer-events-none
        button-holographic ripple-effect
        ${className}
      `}
    >
      {/* Efekt pulzovania na hover */}
      <span className="absolute w-full h-full top-0 left-0 bg-pure-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
      
      {/* Efekt blesku pri kliknutí */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/30 transform scale-x-0 origin-left group-active:scale-x-100 transition-transform duration-300"></span>
      
      {/* Text tlačidla s animovaným gradient textom */}
      <span className="relative z-10 gradient-text">{children}</span>
      
      {/* Animácia načítavania pre disabled stav */}
      {disabled && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="futuristic-loader w-5 h-5"></div>
        </span>
      )}
    </button>
  );
};

export default Button; 