import React, { useState } from 'react';
import { FaHeart, FaComment, FaMapMarkerAlt } from 'react-icons/fa';

const VideoCard = ({ video, className = '' }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg bg-secondary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary-red/10 ${className}`}>
      {/* Thumbnail s efektmi */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Play tlačidlo */}
        <a 
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Prehrať video: ${video.title}`}
        >
          <div className="w-16 h-16 bg-primary-red bg-opacity-90 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:bg-opacity-100 shadow-lg">
            <div className="w-0 h-0 ml-2 border-t-[10px] border-b-[10px] border-l-[15px] border-transparent border-l-white"></div>
          </div>
        </a>
        
        {/* Kategória v rohu */}
        <div className="absolute top-3 right-3 bg-primary-red text-white text-sm py-1 px-3 rounded-full shadow-md">
          {video.category}
        </div>
      </div>
      
      {/* Detaily videa */}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-bold text-white truncate">{video.title}</h3>
        
        {/* Interakcie */}
        <div className="flex items-center mt-3 space-x-4">
          {/* Počet likes + možnosť like-ovať */}
          <button 
            className="flex items-center space-x-1 text-light-gray hover:text-primary-red transition-colors duration-200 group"
            onClick={handleLike}
            aria-label={liked ? "Zrušiť páčenie" : "Páči sa mi to"}
          >
            <FaHeart className={`${liked ? 'text-primary-red' : 'text-light-gray'} transition-colors duration-200 group-hover:text-primary-red`} />
            <span className="text-sm sm:text-base">{liked ? video.likes + 1 : video.likes}</span>
          </button>
          
          {/* Počet komentárov + možnosť otvoriť/zavrieť */}
          <button 
            className="flex items-center space-x-1 text-light-gray hover:text-primary-red transition-colors duration-200 group"
            onClick={toggleComments}
            aria-label={showComments ? "Skryť komentáre" : "Zobraziť komentáre"}
          >
            <FaComment className="text-light-gray transition-colors duration-200 group-hover:text-primary-red" />
            <span className="text-sm sm:text-base">{video.comments?.length || 0}</span>
          </button>
          
          {/* Lokácia */}
          {video.location && (
            <div className="flex items-center space-x-1 text-light-gray ml-auto">
              <FaMapMarkerAlt className="text-light-gray" />
              <span className="text-sm">Slovensko</span>
            </div>
          )}
        </div>
        
        {/* Komentáre */}
        {showComments && video.comments && video.comments.length > 0 && (
          <div className="mt-4 bg-dark-gray bg-opacity-50 rounded-lg p-3 space-y-3 max-h-40 overflow-y-auto">
            {video.comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{comment.user}</span>
                  <span className="text-xs text-light-gray">{comment.timestamp}</span>
                </div>
                <p className="text-light-gray mt-1">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Shine efekt pri hoveri */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-red/0 via-primary-red/10 to-primary-red/0 transform -translate-x-full animate-[shine_3s_infinite]"></div>
      </div>
    </div>
  );
};

export default VideoCard; 