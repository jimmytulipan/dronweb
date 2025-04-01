import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Funkcia pre 3D tilt efekt
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Vypočíta uhly rotácie na základe pozície myši
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Maximálna rotácia 10 stupňov
    const rotateYVal = ((x - centerX) / centerX) * 10;
    const rotateXVal = ((y - centerY) / centerY) * 10 * -1;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  // Reset rotácie pri opustení karty
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link 
      to={`/video/${video.id}`} 
      className={`block overflow-hidden rounded-lg bg-dark-gray hover:shadow-xl transition-all duration-300 ${className || ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-56 object-cover transition-all duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Kategória videa */}
        <div className="absolute top-4 left-4 bg-primary-red px-2 py-1 text-xs font-semibold rounded text-white" 
          style={{
            boxShadow: isHovered ? '0 0 15px rgba(255, 0, 0, 0.7)' : 'none',
            transition: 'all 0.3s ease'
          }}>
          {video.category === 'FPV' ? 'FPV Drony' : 'Cyklotrasy'}
        </div>
        
        {/* Overlay pri hover */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.7 : 0
          }}
        >
          <div className="text-white text-xl">▶ Prehrať video</div>
        </div>
      </div>
      <div className="p-4" style={{ 
        transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
        transition: 'transform 0.3s ease-out'
      }}>
        <h3 className="font-bold text-lg text-white mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {video.title}
        </h3>
        <div className="flex justify-between items-center">
          <div className="text-light-gray text-sm">
            {video.likes} pozretí
          </div>
          <div className="text-primary-red" style={{ 
            animation: isHovered ? 'neonPulse 1.5s infinite' : 'none'
          }}>❤ {video.likes}</div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard; 