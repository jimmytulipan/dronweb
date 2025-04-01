import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false, ref }) => {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary-red text-pure-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg
        hover:bg-accent-red transition duration-300 ease-in-out
        transform hover:scale-105 focus:outline-none focus:ring-2
        focus:ring-primary-red focus:ring-opacity-50 relative
        overflow-hidden shadow-lg shadow-primary-red/20
        active:scale-95 disabled:opacity-50 disabled:pointer-events-none
        button-holographic ripple-effect touch-manipulation
        ${className}
      `}
    >
      {/* Jemný highlight layer */}
      <span className="absolute w-full h-full top-0 left-0 bg-pure-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
      
      {/* Active state efekt */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/30 transform scale-x-0 origin-left group-active:scale-x-100 transition-transform duration-300"></span>
      
      {/* Text */}
      <span className="relative z-10 gradient-text">{children}</span>
      
      {/* Loading indicator */}
      {disabled && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="futuristic-loader w-5 h-5"></div>
        </span>
      )}
    </button>
  );
};

export default Button; 